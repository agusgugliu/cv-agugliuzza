import React, { useEffect, useRef } from 'react';

/* Abstract blue dot-grid that reacts to the cursor. Executive, not "hacker".
   Honors prefers-reduced-motion: renders a single static grid, no loop. */
const HeroBackdrop = ({ theme }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const baseAlpha = theme === 'dark' ? 0.22 : 0.16;
        const hotAlpha = theme === 'dark' ? 0.85 : 0.7;
        const GAP = 38;
        const RADIUS = 1.4;
        const INFLUENCE = 120;

        let dpr = Math.min(window.devicePixelRatio || 1, 2);
        let w = 0;
        let h = 0;
        const mouse = { x: -9999, y: -9999 };

        const resize = () => {
            const rect = canvas.getBoundingClientRect();
            w = rect.width;
            h = rect.height;
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.floor(w * dpr);
            canvas.height = Math.floor(h * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        const draw = () => {
            ctx.clearRect(0, 0, w, h);
            for (let x = GAP / 2; x < w; x += GAP) {
                for (let y = GAP / 2; y < h; y += GAP) {
                    const dx = x - mouse.x;
                    const dy = y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const near = Math.max(0, 1 - dist / INFLUENCE);
                    const alpha = baseAlpha + (hotAlpha - baseAlpha) * near;
                    const r = RADIUS + near * 1.6;
                    ctx.beginPath();
                    ctx.fillStyle = `rgba(22, 82, 240, ${alpha})`;
                    ctx.arc(x, y, r, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        };

        let raf = null;
        const loop = () => {
            draw();
            raf = requestAnimationFrame(loop);
        };

        const onMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };
        const onLeave = () => {
            mouse.x = -9999;
            mouse.y = -9999;
        };

        resize();
        window.addEventListener('resize', resize);

        if (reduce) {
            draw();
        } else {
            window.addEventListener('mousemove', onMove);
            window.addEventListener('mouseout', onLeave);
            loop();
        }

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseout', onLeave);
            if (raf) cancelAnimationFrame(raf);
        };
    }, [theme]);

    return <canvas ref={canvasRef} className="pm-hero-backdrop" aria-hidden="true" />;
};

export default HeroBackdrop;
