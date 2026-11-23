import { chromium } from 'playwright';
import lighthouse from 'lighthouse';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import { AxeBuilder } from '@axe-core/playwright';

const require = createRequire(import.meta.url);
const chromeLauncher = require('chrome-launcher');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '../artifacts/qa-after');
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(path.join(OUT, 'lighthouse'), { recursive: true });
fs.mkdirSync(path.join(OUT, 'screenshots'), { recursive: true });

const BASE = 'http://127.0.0.1:4173';

async function runLh(url, name, formFactor) {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless', '--no-sandbox'] });
  const options = {
    logLevel: 'error',
    output: ['json', 'html'],
    port: chrome.port,
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    formFactor,
    screenEmulation: formFactor === 'mobile' ? { mobile: true, width: 412, height: 823, deviceScaleFactor: 2.625 } : undefined
  };
  if (formFactor === 'desktop') options.screenEmulation = { mobile: false, width: 1350, height: 940, deviceScaleFactor: 1 };
  const runnerResult = await lighthouse(url, options);
  await chrome.kill();
  const reportJson = runnerResult.lhr;
  fs.writeFileSync(path.join(OUT, 'lighthouse', `${name}-${formFactor}.json`), JSON.stringify(reportJson, null, 2));
  fs.writeFileSync(path.join(OUT, 'lighthouse', `${name}-${formFactor}.html`), runnerResult.report[1]);
  const audits = reportJson.audits;
  const pick = (id) => audits[id]?.numericValue ?? audits[id]?.score;
  return {
    perf: Math.round((reportJson.categories.performance.score || 0) * 100),
    a11y: Math.round((reportJson.categories.accessibility.score || 0) * 100),
    bp: Math.round((reportJson.categories['best-practices'].score || 0) * 100),
    seo: Math.round((reportJson.categories.seo.score || 0) * 100),
    lcp: audits['largest-contentful-paint']?.displayValue,
    tbt: audits['total-blocking-time']?.displayValue,
    cls: audits['cumulative-layout-shift']?.displayValue,
    transfer: audits['total-byte-weight']?.displayValue
  };
}

async function screenshots() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const configs = [
    { url: `${BASE}/?mode=portfolio`, name: 'home', widths: [375, 768, 1440] },
    { url: `${BASE}/blog?mode=portfolio`, name: 'blog-portfolio', widths: [375, 768, 1440] }
  ];
  for (const cfg of configs) {
    for (const w of cfg.widths) {
      const page = await context.newPage();
      await page.setViewportSize({ width: w, height: w === 375 ? 812 : 900 });
      await page.goto(cfg.url, { waitUntil: 'networkidle' });
      await page.screenshot({ path: path.join(OUT, 'screenshots', `${cfg.name}-${w}.png`), fullPage: true });
      await page.close();
    }
  }
  const contact = await context.newPage();
  await contact.setViewportSize({ width: 375, height: 812 });
  await contact.goto(`${BASE}/?mode=portfolio#contact`, { waitUntil: 'networkidle' });
  await contact.evaluate(() => document.getElementById('contact')?.scrollIntoView());
  await contact.waitForTimeout(500);
  await contact.screenshot({ path: path.join(OUT, 'screenshots', 'home-375-contact.png'), fullPage: false });
  await contact.close();

  const cmdk = await context.newPage();
  await cmdk.setViewportSize({ width: 1440, height: 900 });
  await cmdk.goto(`${BASE}/?mode=portfolio`, { waitUntil: 'networkidle' });
  await cmdk.keyboard.press('Meta+k');
  await cmdk.waitForTimeout(400);
  await cmdk.screenshot({ path: path.join(OUT, 'screenshots', 'home-cmdk-1440.png'), fullPage: false });
  await cmdk.close();

  const dark = await context.newPage();
  await dark.setViewportSize({ width: 1440, height: 900 });
  await dark.goto(`${BASE}/?mode=portfolio`, { waitUntil: 'networkidle' });
  await dark.evaluate(() => {
    localStorage.setItem('ag.theme', 'dark');
    document.documentElement.setAttribute('data-theme', 'dark');
  });
  await dark.reload({ waitUntil: 'networkidle' });
  await dark.screenshot({ path: path.join(OUT, 'screenshots', 'home-dark-1440.png'), fullPage: false });
  await dark.close();

  const axePage = await context.newPage();
  await axePage.setViewportSize({ width: 1440, height: 900 });
  await axePage.goto(`${BASE}/?mode=portfolio`, { waitUntil: 'networkidle' });
  await axePage.evaluate(() => {
    localStorage.setItem('ag.theme', 'dark');
    document.documentElement.setAttribute('data-theme', 'dark');
  });
  await axePage.reload({ waitUntil: 'networkidle' });
  const axeDark = await new AxeBuilder({ page: axePage })
    .withTags(['wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze();
  const contrastSerious = axeDark.violations.filter((v) => v.id === 'color-contrast' && v.impact === 'serious');
  fs.writeFileSync(path.join(OUT, 'axe-dark-home.json'), JSON.stringify(axeDark, null, 2));

  const blog = await context.newPage();
  await blog.goto(`${BASE}/blog?mode=portfolio`, { waitUntil: 'networkidle' });
  const axeBlog = await new AxeBuilder({ page: blog }).analyze();
  fs.writeFileSync(path.join(OUT, 'axe-blog.json'), JSON.stringify(axeBlog, null, 2));

  await context.close();
  await browser.close();
  return {
    darkContrastSerious: contrastSerious.reduce((n, v) => n + v.nodes.length, 0),
    blogMainViolations: axeBlog.violations.map((v) => v.id)
  };
}

async function main() {
  await new Promise((r) => setTimeout(r, 2000));
  const results = {};
  for (const [name, url] of [
    ['home', `${BASE}/?mode=portfolio`],
    ['blog', `${BASE}/blog?mode=portfolio`]
  ]) {
    results[`${name}-mobile`] = await runLh(url, name, 'mobile');
    results[`${name}-desktop`] = await runLh(url, name, 'desktop');
  }
  const extra = await screenshots();
  fs.writeFileSync(path.join(OUT, 'summary.json'), JSON.stringify({ lighthouse: results, ...extra }, null, 2));
  console.log(JSON.stringify({ lighthouse: results, ...extra }, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});