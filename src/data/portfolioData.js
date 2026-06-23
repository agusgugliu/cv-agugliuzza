// Portfolio mode content — editorial narrative, distinct from cvData.js
// Words wrapped in {italic} render in Instrument Serif italic + blue accent.

const CUST = (file) => `/assets/customer_logos/${file}`;
const CUST_PAIR = (slug) => ({
    logo: CUST(`${slug}_logo_blue.png`),
    logoDark: CUST(`${slug}_logo_white.png`)
});

const MBA = (file) => `/assets/mba_logos/${file}`;
const MBA_PAIR = (slug) => ({
    logo: MBA(`${slug}_logo_blue.png`),
    logoDark: MBA(`${slug}_logo_white.png`)
});

// Wikipedia-style fact sheet per entity (research output).
// industry / country / founded / employees / revenue / extra / descEn / descEs
const INFO = {
    ks_advisory: { industry: 'Strategy & deal advisory', country: 'Spain', founded: null, employees: '~5', revenue: 'n/a', extra: 'Madrid-based boutique focused on SME M&A and fundraising in LATAM and EU', descEn: 'Boutique deal and strategy advisory firm working with SMEs on M&A, fundraising, and buyer matching across LATAM and EU.', descEs: 'Boutique de asesoría en estrategia y deals que trabaja con PyMEs en M&A, fundraising y búsqueda de compradores en LATAM y UE.' },
    life_seguros: { industry: 'Life insurance', country: 'Argentina', founded: 1998, employees: 'n/a', revenue: 'n/a', extra: 'Acquired Prudential Seguros from Prudential Financial in May 2024 via parent Grupo ST', descEn: 'Argentine life insurance company headquartered in Buenos Aires, expanded in 2024 through the acquisition of Prudential Seguros.', descEs: 'Aseguradora de vida argentina con sede en Buenos Aires, expandida en 2024 con la adquisición de Prudential Seguros.' },
    prudential_seguros: { industry: 'Life insurance', country: 'Argentina', founded: 1999, employees: '~400', revenue: '$120M (2024)', extra: 'Acquired by Grupo ST in May 2024 and rebranded as Life Group Seguros', descEn: 'Argentine life insurance subsidiary of Prudential Financial until May 2024, when Grupo ST acquired the operation and merged it into Life Seguros.', descEs: 'Subsidiaria argentina de Prudential Financial hasta mayo 2024, cuando Grupo ST adquirió la operación y la fusionó con Life Seguros.' },
    microstrategy: { industry: 'Enterprise BI software', country: 'USA', founded: 1989, employees: '~1,900', revenue: '$463M (2024)', extra: 'Listed on NASDAQ:MSTR, largest corporate Bitcoin holder, rebranded as Strategy in 2025', descEn: 'US enterprise analytics and BI software company, also the largest corporate holder of Bitcoin and rebranded as Strategy in 2025.', descEs: 'Compañía estadounidense de software de analytics y BI empresarial, además el mayor tenedor corporativo de Bitcoin, rebautizada como Strategy en 2025.' },
    ie_business_school: { industry: 'Higher education', country: 'Spain', founded: 1973, employees: '~500 faculty', revenue: 'n/a', extra: 'Part of IE University, consistently ranked among the top European business schools', descEn: 'Madrid-based graduate business school with over 6,000 students from 130+ nationalities, part of IE University since 2007.', descEs: 'Escuela de negocios de posgrado con sede en Madrid, más de 6.000 alumnos de 130+ nacionalidades, parte de IE University desde 2007.' },
    itba: { industry: 'Higher education', country: 'Argentina', founded: 1959, employees: '~7,000 students', revenue: 'n/a', extra: 'The only private university in Argentina specialized in Technology, Engineering and Management', descEn: 'Private Buenos Aires university specialized in engineering, technology and management, with over 7,000 students across two campuses.', descEs: 'Universidad privada de Buenos Aires especializada en ingeniería, tecnología y management, con más de 7.000 alumnos en dos campus.' },
    aitaca: { industry: 'AI / computer vision', country: 'Spain', founded: null, employees: 'n/a', revenue: 'n/a', extra: 'Maker of Virtual Sizer, an AI photo-based body-measurement engine for jewelry and smart rings', descEn: 'Madrid-based AI startup building photo-based body-measurement technology, with Virtual Sizer as its flagship product for jewelry and smart rings.', descEs: 'Startup de IA con sede en Madrid que construye tecnología de medición corporal por foto, con Virtual Sizer como producto insignia para joyería y smart rings.' },
    microsoft: { industry: 'Software & cloud', country: 'USA', founded: 1975, employees: '228,000', revenue: '$245B (FY2024)', extra: 'Listed on NASDAQ:MSFT, among the world\'s most valuable companies', descEn: 'American multinational technology company best known for Windows, Office, Azure cloud services and Microsoft 365, founded by Bill Gates and Paul Allen.', descEs: 'Empresa tecnológica multinacional estadounidense conocida por Windows, Office, los servicios cloud de Azure y Microsoft 365, fundada por Bill Gates y Paul Allen.' },
    prudential: { industry: 'Life insurance', country: 'Argentina', founded: 1999, employees: '~400', revenue: '$120M (2024)', extra: 'Acquired by Grupo ST in May 2024 and rebranded as Life Group Seguros', descEn: 'Argentine life insurance subsidiary of Prudential Financial until May 2024, when Grupo ST acquired the operation and merged it into Life Seguros.', descEs: 'Subsidiaria argentina de Prudential Financial hasta mayo 2024, cuando Grupo ST adquirió la operación y la fusionó con Life Seguros.' },
    mercadolibre: { industry: 'E-commerce & fintech', country: 'Argentina', founded: 1999, employees: '84,200', revenue: '$21B (2024)', extra: 'Listed on NASDAQ:MELI, the largest e-commerce platform in Latin America', descEn: 'Argentine-founded e-commerce and fintech giant operating across 18 Latin American countries, with marketplace, payments, logistics and credit lines.', descEs: 'Gigante argentino de e-commerce y fintech con operaciones en 18 países latinoamericanos, con marketplace, pagos, logística y crédito.' },
    sullair: { industry: 'Industrial compressors', country: 'USA', founded: 1965, employees: '~450', revenue: '$257M (2025)', extra: 'Acquired by Hitachi in July 2017, now part of Hitachi Global Air Power', descEn: 'US industrial air-compressor manufacturer headquartered in Indiana, part of Hitachi Global Air Power since 2017.', descEs: 'Fabricante estadounidense de compresores industriales de aire con sede en Indiana, parte de Hitachi Global Air Power desde 2017.' },
    agea_clarin: { industry: 'Media & publishing', country: 'Argentina', founded: 1945, employees: '~1,000', revenue: 'n/a', extra: 'Publisher arm of Grupo Clarín, the largest media conglomerate in Argentina', descEn: 'Argentine publishing company owned by Grupo Clarín, behind Clarín, Olé, La Razón and 35+ other print and digital brands.', descEs: 'Editorial argentina del Grupo Clarín, detrás de Clarín, Olé, La Razón y más de 35 marcas impresas y digitales.' },
    swissmedical: { industry: 'Private healthcare & insurance', country: 'Argentina', founded: 1989, employees: '~16,500', revenue: '$1.6B (2025)', extra: 'Leading private health and life-insurance group in Argentina', descEn: 'Argentine private healthcare group operating prepaid medical plans, hospitals, clinics and life insurance, founded in Buenos Aires in 1989.', descEs: 'Grupo argentino de salud privada que opera prepagas, hospitales, clínicas y seguros de vida, fundado en Buenos Aires en 1989.' },
    arcor: { industry: 'Food & confectionery', country: 'Argentina', founded: 1951, employees: '~20,000', revenue: '$5B (2024)', extra: 'World\'s top hard-candy producer and 10th largest confectionery maker overall', descEn: 'Argentine multinational food company specialized in confectionery, cookies, chocolates and packaged foods, with operations across five continents.', descEs: 'Multinacional argentina de alimentos especializada en confitería, galletas, chocolates y alimentos empaquetados, con operaciones en cinco continentes.' },
    bancogeneral: { industry: 'Retail banking', country: 'Panama', founded: 1955, employees: '~4,600', revenue: '$1.8B', extra: 'Largest bank in Panama by total assets ($19.4B)', descEn: 'Panama\'s largest commercial bank by assets, providing retail, corporate and investment banking through 72 branches and 625 ATMs.', descEs: 'Mayor banco comercial de Panamá por activos, ofreciendo banca minorista, corporativa y de inversión a través de 72 sucursales y 625 cajeros.' },
    wawanesa: { industry: 'Mutual insurance', country: 'Canada', founded: 1896, employees: '~5,500', revenue: 'CAD$4B', extra: 'One of Canada\'s largest mutual insurers, headquartered in Winnipeg with $11.5B in assets', descEn: 'Canadian mutual insurance company founded in 1896, providing property, auto and life insurance across Canada and parts of the United States.', descEs: 'Aseguradora mutual canadiense fundada en 1896, ofreciendo seguros de propiedad, automotor y vida en Canadá y partes de Estados Unidos.' },
    hipotecario: { industry: 'Banking & mortgages', country: 'Argentina', founded: 1886, employees: '~2,600', revenue: '$456M', extra: 'Founded by President Julio Roca to provide mortgage credit; today a full-service retail bank', descEn: 'Argentine bank originally created in 1886 as a national mortgage lender, today operating as a full-service retail and corporate bank.', descEs: 'Banco argentino creado en 1886 como prestamista hipotecario nacional, hoy un banco comercial y corporativo de servicios completos.' },
    supervielle: { industry: 'Banking & financial services', country: 'Argentina', founded: 1887, employees: '~3,100', revenue: '$750M (2025)', extra: 'Listed on NYSE:SUPV through parent Grupo Supervielle', descEn: 'Argentine universal bank headquartered in Rosario, offering retail, SME and corporate banking through Grupo Supervielle.', descEs: 'Banco universal argentino con sede en Rosario, que ofrece banca minorista, PyME y corporativa a través de Grupo Supervielle.' },
    patagonia: { industry: 'Retail banking', country: 'Argentina', founded: 1976, employees: '~2,800', revenue: 'n/a', extra: 'Majority-owned by Brazil\'s Banco do Brasil since 2010', descEn: 'Argentine commercial bank with around 200 service points nationwide, majority-owned by Banco do Brasil since 2010.', descEs: 'Banco comercial argentino con cerca de 200 puntos de atención en el país, mayoritariamente propiedad de Banco do Brasil desde 2010.' },
    techint: { industry: 'Industrial conglomerate', country: 'Argentina / Italy', founded: 1945, employees: '~60,000', revenue: '~$30B', extra: 'Owner of Tenaris (NYSE:TS) and Ternium (NYSE:TX); second-largest privately held company in LATAM', descEn: 'Italo-Argentine industrial conglomerate active in steel (Ternium), seamless tubes (Tenaris), engineering, oil & gas, plant-making and healthcare.', descEs: 'Conglomerado industrial ítalo-argentino activo en acero (Ternium), tubos sin costura (Tenaris), ingeniería, petróleo y gas, plantas y salud.' },
    afip: { industry: 'Public sector / tax authority', country: 'Argentina', founded: 1997, employees: '~22,000', revenue: 'n/a', extra: 'Dissolved in October 2024 and replaced by ARCA (Agencia de Recaudación y Control Aduanero)', descEn: 'Former Argentine federal tax and customs authority, dissolved in October 2024 and replaced by the slimmer ARCA agency.', descEs: 'Antigua autoridad federal argentina de impuestos y aduanas, disuelta en octubre 2024 y reemplazada por la nueva agencia ARCA.' }
};

const MBA_PARTNERS = [
    { name: 'Aitaca', domain: 'aitaca.io', ...MBA_PAIR('aitaca'), info: INFO.aitaca },
    { name: 'Microsoft', domain: 'microsoft.com', ...MBA_PAIR('microsoft'), info: INFO.microsoft }
];

const MSTR_CLIENTS = [
    { name: 'Prudential', domain: 'prudential.com.ar', ...CUST_PAIR('prudential'), info: INFO.prudential },
    { name: 'Mercado Libre', domain: 'mercadolibre.com', ...CUST_PAIR('mercadolibre'), info: INFO.mercadolibre },
    { name: 'Sullair', domain: 'sullair.com', ...CUST_PAIR('sullair'), info: INFO.sullair },
    { name: 'AGEA (Clarín)', domain: 'clarin.com', ...CUST_PAIR('clarin'), info: INFO.agea_clarin },
    { name: 'Swiss Medical', domain: 'swissmedical.com.ar', ...CUST_PAIR('swissmedical'), info: INFO.swissmedical },
    { name: 'Arcor', domain: 'arcor.com', ...CUST_PAIR('arcor'), info: INFO.arcor },
    { name: 'Banco General de Panamá', domain: 'bgeneral.com', ...CUST_PAIR('bancogeneral'), info: INFO.bancogeneral },
    { name: 'Wawanesa Insurance', domain: 'wawanesa.com', ...CUST_PAIR('wawanessa'), info: INFO.wawanesa },
    { name: 'Banco Hipotecario', domain: 'hipotecario.com.ar', ...CUST_PAIR('hipotecario'), info: INFO.hipotecario },
    { name: 'Banco Supervielle', domain: 'supervielle.com.ar', ...CUST_PAIR('supervielle'), info: INFO.supervielle },
    { name: 'Banco Patagonia', domain: 'bancopatagonia.com.ar', ...CUST_PAIR('patagonia'), info: INFO.patagonia },
    { name: 'Grupo Techint', domain: 'techint.com', ...CUST_PAIR('techint'), info: INFO.techint },
    { name: 'AFIP', domain: 'afip.gob.ar', ...CUST_PAIR('afip'), info: INFO.afip }
];

const APPS = [
    {
        name: 'Obrex',
        desc: { en: 'Marketplace for construction surplus: snap a photo of leftover material and the platform builds the listing.', es: 'Marketplace de surplus de construcción: sacás una foto del sobrante y la plataforma genera el listing.' },
        url: 'https://obrex-web-zeta.vercel.app',
        initial: 'O',
        color: '#1652F0'
    },
    {
        name: 'Lect.io',
        desc: { en: 'AI-powered study assistant that helps students summarize material, practice, and review course topics.', es: 'Asistente de estudio con IA que ayuda a estudiantes a resumir material, practicar y repasar los temas de sus cursos.' },
        url: 'https://agusgugliu-lectio.vercel.app',
        initial: 'L',
        color: '#1652F0'
    },
    {
        name: 'Kick-Off Central',
        desc: { en: 'Sports hub delivering AI-driven match predictions and performance analysis across leagues.', es: 'Hub deportivo con predicciones de partidos y análisis de rendimiento impulsados por IA.' },
        url: 'https://agusgugliu-soccer-hub.vercel.app',
        initial: 'K',
        color: '#0A2EAA'
    },
    {
        name: 'Terranova',
        desc: { en: 'AI travel planner that builds complete itineraries: routes, destinations, landmarks, and local guides.', es: 'Planificador de viajes con IA que arma itinerarios completos: rutas, destinos, puntos de interés y guías locales.' },
        url: 'https://imba-s5-terranova.vercel.app',
        initial: 'T',
        color: '#0B0E14'
    },
    {
        name: 'Bionic Reader',
        desc: { en: 'Reading tool that bolds word fragments to guide the eye and read faster, with AI-assisted document processing.', es: 'Herramienta de lectura que resalta fragmentos de palabras para guiar la vista y leer más rápido, con procesamiento de documentos asistido por IA.' },
        url: null,
        initial: 'B',
        color: '#0A2EAA'
    },
    {
        name: 'Sanctuary 75',
        desc: { en: 'Wellness tracker for the 75-day challenge that keeps daily habits and progress on track.', es: 'Tracker de bienestar para el reto de 75 días que mantiene hábitos y progreso diario en orden.' },
        url: 'https://75-holistic.vercel.app',
        initial: 'S',
        color: '#0B0E14'
    }
];

// IMBA transcript (IE official bands: Honors / Excellence / Proficiency / Pass).
// Source of truth: Obsidian wiki/education/mba/mba-gpa-4.0.md + grades/.
const IE_TRANSCRIPT_EN = {
    gpa: '3.61 / 4.00',
    terms: [
        {
            name: 'Term 1 · Sep–Dec 2025', gpa: '3.42', courses: [
                { name: 'Strategy', band: 'Excellence', summary: 'Industry analysis, competitive advantage, and platform and ecosystem models.' },
                { name: 'Financial Markets', band: 'Excellence', summary: 'Time value of money, DCF, and frameworks for investment decisions.' },
                { name: 'Financial Reporting & Analysis', band: 'Excellence', summary: 'Accounting principles and reading financial statements to drive decisions.' },
                { name: 'Marketing Management', band: 'Excellence', summary: 'Segmentation, positioning, the marketing mix, and data-informed planning.' },
                { name: 'Innovation in a Digital World', band: 'Proficiency', summary: 'Digital business models and the forces driving digital transformation.' },
                { name: 'Operations Management', band: 'Pass', summary: 'Process design, operations strategy, and supply chain configuration.' },
                { name: 'Entrepreneurship', band: 'Pass', summary: 'Opportunity recognition, business model validation, fundraising, and scaling.' }
            ]
        },
        {
            name: 'Term 2 · Jan–Mar 2026', gpa: '3.66', courses: [
                { name: 'Leading People & Change', band: 'Honors', summary: 'Leadership, organizational design, motivation, and conflict management.' },
                { name: 'Corporate Finance', band: 'Excellence', summary: 'Valuation (WACC, DCF, multiples), capital structure, and M&A.' },
                { name: 'Managerial Accounting', band: 'Excellence', summary: 'Cost analysis, budgeting, and management control systems.' },
                { name: 'Managerial Economics', band: 'Excellence', summary: 'Micro and macro policy, market structures, and firm dynamics.' },
                { name: 'Data Analytics for Managers', band: 'Excellence', summary: 'Quantitative decision models, regression, and managerial analytics.' },
                { name: 'Supply Chain Management', band: 'Excellence', summary: 'Integrated supply chain strategy and sustainability.' },
                { name: 'Business, Government & Sustainability', band: 'Proficiency', summary: 'Nonmarket strategy, regulatory and political risk, and ESG.' }
            ]
        },
        {
            name: 'Term 3 · Mar–Jun 2026', gpa: '3.61', courses: [
                { name: 'Digital Business Strategy', band: 'Honors', summary: 'Multi-sided platforms, data monetization, and AI in competitive positioning.' },
                { name: 'AI for Business', band: 'Excellence', summary: 'Machine learning, generative AI, responsible AI, and data-driven decisions.' },
                { name: 'Applied Data Analytics', band: 'Excellence', summary: 'Regression, Monte Carlo simulation, and quantitative models across functions.' },
                { name: 'Technology Product Management', band: 'Excellence', summary: 'Opportunity discovery, MVP development, and product strategy.' },
                { name: 'Operational Excellence & Digitalization', band: 'Proficiency', summary: 'Process mapping, Lean diagnostics, and analytics-driven operations.' },
                { name: 'Digital Services Design', band: 'Proficiency', summary: 'Human-centered service design, behavioral science, and AI in services.' }
            ]
        },
        {
            name: 'ISA · Skill Modules', gpa: '3.81', courses: [
                { name: 'AI for Productivity', band: 'Honors', summary: 'Applying AI tools to accelerate knowledge work.' },
                { name: 'Creative Thinking', band: 'Honors', summary: 'Structured ideation and reframing techniques.' },
                { name: 'Storytelling & Public Speaking', band: 'Honors', summary: 'Narrative structure and executive presence.' },
                { name: 'Data Fluency', band: 'Honors', summary: 'Tableau and data-driven communication.' },
                { name: 'Critical Thinking', band: 'Excellence', summary: 'Argument analysis and reasoning under uncertainty.' },
                { name: 'Problem Solving', band: 'Excellence', summary: 'Issue trees, hypotheses, and MECE structuring.' },
                { name: 'Project Management', band: 'Excellence', summary: 'Agile/Scrum and classic delivery methods.' },
                { name: 'Power & Influence', band: 'Excellence', summary: 'Negotiation and stakeholder influence.' },
                { name: 'High-Performance Teambuilding I', band: 'Excellence', summary: 'Team dynamics and collaboration.' },
                { name: 'High-Performance Teambuilding II', band: 'Excellence', summary: 'Advanced team leadership.' },
                { name: 'Self-Transformation', band: 'Excellence', summary: 'Personal development and reflective practice.' }
            ]
        }
    ]
};

const IE_TRANSCRIPT_ES = {
    gpa: '3.61 / 4.00',
    terms: [
        {
            name: 'Term 1 · Sep–Dic 2025', gpa: '3.42', courses: [
                { name: 'Strategy', band: 'Excellence', summary: 'Análisis de industria, ventaja competitiva y modelos de plataforma y ecosistema.' },
                { name: 'Financial Markets', band: 'Excellence', summary: 'Valor temporal del dinero, DCF y frameworks para decisiones de inversión.' },
                { name: 'Financial Reporting & Analysis', band: 'Excellence', summary: 'Principios contables y lectura de estados financieros para decidir.' },
                { name: 'Marketing Management', band: 'Excellence', summary: 'Segmentación, posicionamiento, marketing mix y planificación con datos.' },
                { name: 'Innovation in a Digital World', band: 'Proficiency', summary: 'Modelos de negocio digitales y fuerzas detrás de la transformación digital.' },
                { name: 'Operations Management', band: 'Pass', summary: 'Diseño de procesos, estrategia de operaciones y configuración de supply chain.' },
                { name: 'Entrepreneurship', band: 'Pass', summary: 'Identificación de oportunidades, validación de modelos, fundraising y escalado.' }
            ]
        },
        {
            name: 'Term 2 · Ene–Mar 2026', gpa: '3.66', courses: [
                { name: 'Leading People & Change', band: 'Honors', summary: 'Liderazgo, diseño organizacional, motivación y gestión de conflictos.' },
                { name: 'Corporate Finance', band: 'Excellence', summary: 'Valoración (WACC, DCF, múltiplos), estructura de capital y M&A.' },
                { name: 'Managerial Accounting', band: 'Excellence', summary: 'Análisis de costos, presupuestación y sistemas de control de gestión.' },
                { name: 'Managerial Economics', band: 'Excellence', summary: 'Política micro y macro, estructuras de mercado y dinámica de la firma.' },
                { name: 'Data Analytics for Managers', band: 'Excellence', summary: 'Modelos cuantitativos de decisión, regresión y analítica de gestión.' },
                { name: 'Supply Chain Management', band: 'Excellence', summary: 'Estrategia integrada de supply chain y sostenibilidad.' },
                { name: 'Business, Government & Sustainability', band: 'Proficiency', summary: 'Estrategia no-de-mercado, riesgo regulatorio y político, y ESG.' }
            ]
        },
        {
            name: 'Term 3 · Mar–Jun 2026', gpa: '3.61', courses: [
                { name: 'Digital Business Strategy', band: 'Honors', summary: 'Plataformas multi-side, monetización de datos e IA en el posicionamiento.' },
                { name: 'AI for Business', band: 'Excellence', summary: 'Machine learning, IA generativa, IA responsable y decisiones con datos.' },
                { name: 'Applied Data Analytics', band: 'Excellence', summary: 'Regresión, simulación Monte Carlo y modelos cuantitativos por función.' },
                { name: 'Technology Product Management', band: 'Excellence', summary: 'Descubrimiento de oportunidades, desarrollo de MVPs y estrategia de producto.' },
                { name: 'Operational Excellence & Digitalization', band: 'Proficiency', summary: 'Mapeo de procesos, diagnóstico Lean y operaciones data-driven.' },
                { name: 'Digital Services Design', band: 'Proficiency', summary: 'Diseño de servicios centrado en el usuario, ciencia del comportamiento e IA.' }
            ]
        },
        {
            name: 'ISA · Skill Modules', gpa: '3.81', courses: [
                { name: 'AI for Productivity', band: 'Honors', summary: 'Aplicar herramientas de IA para acelerar el trabajo intelectual.' },
                { name: 'Creative Thinking', band: 'Honors', summary: 'Ideación estructurada y técnicas de reframing.' },
                { name: 'Storytelling & Public Speaking', band: 'Honors', summary: 'Estructura narrativa y presencia ejecutiva.' },
                { name: 'Data Fluency', band: 'Honors', summary: 'Tableau y comunicación basada en datos.' },
                { name: 'Critical Thinking', band: 'Excellence', summary: 'Análisis de argumentos y razonamiento bajo incertidumbre.' },
                { name: 'Problem Solving', band: 'Excellence', summary: 'Issue trees, hipótesis y estructuración MECE.' },
                { name: 'Project Management', band: 'Excellence', summary: 'Métodos Agile/Scrum y entrega clásica.' },
                { name: 'Power & Influence', band: 'Excellence', summary: 'Negociación e influencia sobre stakeholders.' },
                { name: 'High-Performance Teambuilding I', band: 'Excellence', summary: 'Dinámica de equipos y colaboración.' },
                { name: 'High-Performance Teambuilding II', band: 'Excellence', summary: 'Liderazgo de equipos avanzado.' },
                { name: 'Self-Transformation', band: 'Excellence', summary: 'Desarrollo personal y práctica reflexiva.' }
            ]
        }
    ]
};

const EXP_LOGO = (file) => `/assets/experience_logos/${file}`;

const LOGOS_WORKED = [
    { name: 'IE Business School', domain: 'ie.edu', logo: EXP_LOGO('iebusinessschool_logo.png'), info: INFO.ie_business_school },
    { name: 'Life Seguros', domain: 'lifeseguros.com.ar', logo: EXP_LOGO('lifeseguros_logo.png'), info: INFO.life_seguros },
    { name: 'Prudential', domain: 'prudential.com.ar', logo: EXP_LOGO('prudential_logo.png'), info: INFO.prudential_seguros },
    { name: 'MicroStrategy', domain: 'microstrategy.com', logo: EXP_LOGO('microstrategy_logo.png'), info: INFO.microstrategy },
    { name: 'KS Advisory', domain: null, logo: EXP_LOGO('ksadvisory_logo.png'), info: INFO.ks_advisory },
    { name: 'ITBA', domain: 'itba.edu.ar', logo: EXP_LOGO('itba_logo.png'), info: INFO.itba }
];

const LOGOS_PROJECTS = [
    ...MSTR_CLIENTS.map(c => ({ name: c.name, domain: c.domain, logo: c.logo, logoDark: c.logoDark, info: c.info })),
    ...MBA_PARTNERS.map(p => ({ name: p.name, domain: p.domain, logo: p.logo, logoDark: p.logoDark, info: p.info }))
];

export const portfolioEN = {
    nav: {
        portfolio: 'Portfolio',
        cv: 'CV view',
        downloadPdf: 'PDF',
        projects: 'Projects',
        work: 'Work',
        apps: 'Apps',
        ideas: 'Ideas',
        contact: 'Contact'
    },
    hero: {
        meta: ['Madrid, Spain', 'PM · Strategy · AI Ops · Digital Transformation'],
        statement: 'I build with AI and redesign how work gets done, turning {operations} into {outcomes}.',
        cta: 'Book a call',
        ctaSecondary: 'See the work'
    },
    projects: {
        eyebrow: 'Selected projects',
        heading: 'Where I {build with AI} and redesign how work gets done.',
        lead: 'Four projects where AI changed the process, not just the slide.',
        items: [
            {
                title: 'Almazara Co-Pilot',
                org: 'IE Tech Lab · Microsoft',
                year: '2026',
                outcome: 'An AI co-pilot for olive-oil mills that predicts oil grade at intake to cut downgrade losses.',
                aiAngle: 'Computer vision and a grade model replace a manual, end-of-line quality call with a real-time, explainable prediction.',
                tags: ['AI product', 'Computer vision', 'Azure', 'Process redesign'],
                accent: '#1652F0'
            },
            {
                title: 'KS Advisory AI Deal Platform',
                org: 'KS Advisory',
                year: '2026',
                outcome: 'An AI agent system that runs screening, research and drafting across a USD 900M+ M&A pipeline.',
                aiAngle: '38 specialized agents automate the research-to-memo workflow a deal team used to run by hand.',
                tags: ['AI agents', 'M&A', 'Automation', 'Claude'],
                accent: '#0A2EAA'
            },
            {
                title: 'Aitaca M&A & Growth Strategy',
                org: 'IE Final Project',
                year: '2026',
                outcome: 'M&A and market-entry strategy for Aitaca (AI computer-vision sizing) on a 2-3 year exit horizon.',
                aiAngle: 'Field research and acquirer mapping turned into a board-ready exit narrative for an AI startup.',
                tags: ['Strategy', 'M&A', 'Market entry', 'AI startup'],
                accent: '#0B0E14'
            },
            {
                title: 'Corporate Data Lake',
                org: 'Life Seguros',
                year: '2024-2025',
                outcome: 'Architected the corporate Data Lake unifying every operational and analytical source into one layer.',
                aiAngle: 'The single data foundation that makes company-wide analytics and AI possible. Cut time-to-market 20%.',
                tags: ['Data Lake', 'Architecture', 'Analytics', 'Transformation'],
                accent: '#5D85FF'
            }
        ]
    },
    problems: {
        eyebrow: 'What I help with',
        heading: 'Six kinds of {problems} I solve well.',
        items: [
            {
                num: '01',
                title: 'From transformation appetite to a {sequenced roadmap}.',
                body: 'Turning the board\'s "we need to modernize" into a concrete, sequenced plan: which capability ships first, what it unlocks next, what the team commits to in 90 days.'
            },
            {
                num: '02',
                title: 'From top-down rollout to {change people choose}.',
                body: 'Bringing the operation along through the transition — listening to the floor, surfacing the trade-offs, turning sceptics into champions before the system goes live.'
            },
            {
                num: '03',
                title: 'From manual repetition to {AI-assisted operations}.',
                body: 'Embedding AI and automation into the workflows where they earn their place — drafting, triaging, summarizing — without losing the human judgment that keeps the work honest.'
            },
            {
                num: '04',
                title: 'From big-bang releases to an {agile delivery cadence}.',
                body: 'Shipping change in small, reversible increments: weekly demo, monthly value, quarterly course-correction. Less ceremony, more momentum.'
            },
            {
                num: '05',
                title: 'From data exhaust to {insight you can act on}.',
                body: 'Building the analytics layer that turns operational noise into the two or three numbers leadership actually steers by. KPI design, dashboards people open weekly, and the analysis behind every chart.'
            },
            {
                num: '06',
                title: 'From "we should explore options" to {a deal with a shortlist}.',
                body: 'Advising on transactions: screening opportunities, writing the blind teaser, mapping the buyer universe, pressure-testing the financial model. The work that turns intent into a closed round.'
            }
        ]
    },
    track: {
        eyebrow: 'Track record',
        heading: 'A career built across {digital transformation, data and deals}.',
        cta: 'See full CV',
        legend: { work: 'Work', education: 'Education', workShort: 'WORK', educationShort: 'EDU' },
        cases: [
            {
                kind: 'work',
                startDate: 'Apr 2026',
                role: 'Strategy & Deal Advisor',
                org: 'KS Advisory',
                domain: null,
                logo: EXP_LOGO('ksadvisory_logo.png'),
                info: INFO.ks_advisory,
                dates: 'Apr 2026 – Present · Madrid',
                stat: '5+',
                statLabel: 'Live mandates',
                heading: 'Advising on {deal screening, buyer matching, and fundraising diagnostics} for SMEs in LATAM and EU.',
                body: 'Screening opportunities, structuring blind teasers, mapping buyer universes, and pressure-testing financial models. Work spans construction, hospitality, jewelry, and renewables. Currently co-building the firm\'s AI platform for deal analysis and tracking.',
                tags: ['M&A', 'Strategy', 'Due diligence', 'LATAM-EU']
            },
            {
                kind: 'education',
                startDate: 'Sep 2025',
                role: 'International MBA',
                org: 'IE Business School',
                domain: 'ie.edu',
                logo: EXP_LOGO('iebusinessschool_logo.png'),
                info: INFO.ie_business_school,
                dates: 'Sep 2025 – Jul 2026 · Madrid',
                stat: 'IMBA',
                statLabel: 'Class of 2026',
                heading: 'Full-time MBA with specialization in {Digital Business Innovation & Transformation}.',
                body: 'Specialization built around the modern operating layer: digital business design, transformation strategy, AI for business, and the org change that goes with each. Working with Aitaca Remote Tech on Virtual Sizer\'s go-to-market thesis (AI photo-based body-measurement for jewelry and smart rings), and joining Microsoft for the Tech Lab module.',
                tags: ['IMBA', 'Digital Business Innovation', 'Transformation'],
                transcript: IE_TRANSCRIPT_EN,
                clients: MBA_PARTNERS,
                clientsLabel: 'Worked with'
            },
            {
                role: 'IT Team Lead & Project Manager',
                kind: 'work',
                startDate: 'Aug 2024',
                org: 'Life Seguros',
                domain: 'lifeseguros.com.ar',
                logo: EXP_LOGO('lifeseguros_logo.png'),
                info: INFO.life_seguros,
                dates: 'Aug 2024 – Jul 2025 · Buenos Aires',
                stat: '-20%',
                statLabel: 'Time-to-market',
                heading: 'IT leadership, M&A change management, and a {corporate Data Lake} unifying the company\'s data.',
                body: 'Three workstreams in parallel: leading the IT team and PM cadence; running change management for the Prudential Seguros M&A, including the systems integration between both insurers; and architecting the corporate Data Lake that brings every operational and analytical source into a single layer. Cut time-to-market by 20% along the way.',
                tags: ['Team leadership', 'Change management', 'Systems integration', 'Data Lake']
            },
            {
                role: 'IT Team Leader & Project Manager',
                kind: 'work',
                startDate: 'Apr 2022',
                org: 'Prudential Seguros',
                domain: 'prudential.com.ar',
                logo: EXP_LOGO('prudential_logo.png'),
                info: INFO.prudential_seguros,
                dates: 'Apr 2022 – Jul 2024 · Buenos Aires',
                stat: 'IT + Analytics',
                statLabel: 'Cross-functional leadership',
                heading: 'Cross-functional team leadership and {Agile delivery} for the insurance technology stack.',
                body: 'First met Prudential as a MicroStrategy client; joined the team in-house to lead the IT and analytics workstream. Set up the Agile cadence, kept MicroStrategy as the analytics backbone, and coordinated delivery across IT, operations, and the business.',
                tags: ['MicroStrategy', 'Agile', 'Cross-functional leadership', 'IT Project Management']
            },
            {
                role: 'BI Consultant',
                kind: 'work',
                startDate: 'Aug 2017',
                org: 'MicroStrategy Inc.',
                domain: 'microstrategy.com',
                logo: EXP_LOGO('microstrategy_logo.png'),
                info: INFO.microstrategy,
                dates: 'Aug 2017 – Mar 2022 · LATAM',
                stat: '13',
                statLabel: 'Enterprise clients',
                heading: 'Five years implementing {enterprise BI} for banks, insurers, retailers and the public sector across LATAM.',
                body: 'Consulted end-to-end on enterprise BI projects, working hand-in-hand with the client teams from project planning to data model design, reports and dashboards build, and end-user training. Built predictive models in Python and RScript, and led onboarding for new MicroStrategy consultants joining the LATAM practice. The base for everything that came after: how to talk to a CFO, how to land a dashboard, how to run a project.',
                tags: ['MicroStrategy', 'SQL', 'Python', 'RScript', 'Data modeling', 'Project Management'],
                clients: MSTR_CLIENTS,
                clientsLabel: 'Selected clients'
            },
            {
                role: 'Bachelor in Management & Information Systems',
                kind: 'education',
                startDate: 'Jul 2013',
                org: 'ITBA — Instituto Tecnológico de Buenos Aires',
                domain: 'itba.edu.ar',
                logo: EXP_LOGO('itba_logo.png'),
                info: INFO.itba,
                dates: 'Jul 2013 – Jul 2017 · Buenos Aires',
                stat: '2017',
                statLabel: 'Graduated',
                heading: 'Four-year bachelor blending {management and information systems} at one of Argentina\'s top engineering schools.',
                body: 'Four-year bachelor combining business strategy and information systems: management, accounting, microeconomics and operations on one side; data structures, databases, programming, and systems design on the other. Built around the idea that technology decisions are business decisions, and vice versa.',
                tags: ['Business + Tech', 'Information Systems', 'Decision-making']
            }
        ]
    },
    apps: {
        eyebrow: 'AI tools & automations I have shipped',
        heading: 'Small {AI products} I build to take ideas to production.',
        lead: 'Prototypes I ship to test an idea, automate a process, or prove an AI workflow end to end. All live on Vercel.',
        items: APPS.map(a => ({ ...a, desc: a.desc.en }))
    },
    logos: {
        eyebrow: 'Companies and institutions',
        groups: [
            { label: 'Where I studied & worked', items: LOGOS_WORKED },
            { label: 'Project collaborations', items: LOGOS_PROJECTS }
        ]
    },
    principles: {
        eyebrow: 'How I run a project',
        heading: 'A few {beliefs} that shape how I run a project.',
        items: [
            {
                num: '01',
                title: 'Delivery beats deck.',
                body: 'A working v1 teaches you more than three months of planning. Ship, then formalize what works.'
            },
            {
                num: '02',
                title: 'Make the number argue first.',
                body: 'Every recommendation starts with a metric. If the number doesn\'t make the case, no narrative will.'
            },
            {
                num: '03',
                title: 'AI is a copilot, not a deliverable.',
                body: 'I use it daily — drafting, analyzing, prototyping. A model never ships work without a human on the hook.'
            },
            {
                num: '04',
                title: 'Cadence over heroics.',
                body: 'Projects fail in the in-between weeks. Weekly checkpoints, owners on every line — that\'s what compounds.'
            }
        ]
    },
    ai: {
        eyebrow: 'End-to-end AI projects',
        heading: 'How I take an AI idea from {whiteboard to production}.',
        lead: 'Five steps. Each one earns the next.',
        flow: ['01 Discovery', '02 Data', '03 Build', '04 Adoption', '05 Iterate'],
        steps: [
            {
                num: 'Step 01',
                title: 'Discovery & framing',
                body: 'Talk to stakeholders, scope the problem honestly. Decide what AI solves and what doesn\'t.',
                tools: 'Notion · Miro · 1:1 · Figma / Canva'
            },
            {
                num: 'Step 02',
                title: 'Data audit & prep',
                body: 'Map sources, fix quality, set up the data layer the AI will sit on. No model survives bad data.',
                tools: 'Databases · Python · dbt'
            },
            {
                num: 'Step 03',
                title: 'POC → production',
                body: 'Prompt design, model selection, pipelines, evals, monitoring. Ship the smallest useful thing, then harden.',
                tools: 'Claude · OpenAI · Gemini · n8n'
            },
            {
                num: 'Step 04',
                title: 'Adoption & change',
                body: 'Train users, embed in the workflow, document the playbook. AI that nobody runs is theatre.',
                tools: 'Notion · Loom · Sessions'
            },
            {
                num: 'Step 05',
                title: 'Iterate & evolve',
                body: 'Measure usage, capture feedback, retrain, retire what doesn\'t pull weight.',
                tools: 'Feedback loops'
            }
        ]
    },
    contact: {
        eyebrow: 'Start a conversation',
        heading: 'For work, advisory, or a {coffee} in Madrid.',
        lead: 'Open to advisory and project leadership in digital transformation, AI ops and data, across LATAM and Europe. Currently completing the IMBA at IE Business School and based in Madrid.',
        links: [
            { label: 'Email', value: 'agugliuzzapicci@gmail.com', href: 'mailto:agugliuzzapicci@gmail.com', action: 'Write' },
            { label: 'WhatsApp', value: '+34 610 01 05 76', href: 'https://wa.me/34610010576', action: 'Message' },
            { label: 'LinkedIn', value: '/in/agustin-gugliuzza', href: 'https://linkedin.com/in/agustin-gugliuzza', action: 'Connect' },
            { label: 'Twitter', value: '@agusgugliu', href: 'https://x.com/agusgugliu', action: 'Follow' },
            { label: 'Schedule', value: 'Book a 30-min call', href: 'https://app.reclaim.ai/m/agustin-gugliuzza/high-priority', action: 'Reclaim' }
        ]
    },
    footer: {
        name: 'Agustín Gugliuzza.',
        meta: 'Madrid · 2026',
        credit: 'Crafted with React + Vite, hosted on Vercel.',
        backToTop: 'Back to top',
        socials: [
            { platform: 'twitter', href: 'https://x.com/agusgugliu', label: 'Twitter' },
            { platform: 'github', href: 'https://github.com/agusgugliu', label: 'GitHub' },
            { platform: 'linkedin', href: 'https://linkedin.com/in/agustin-gugliuzza', label: 'LinkedIn' }
        ]
    }
};

export const portfolioES = {
    nav: {
        portfolio: 'Portfolio',
        cv: 'Vista CV',
        downloadPdf: 'PDF',
        projects: 'Proyectos',
        work: 'Trabajo',
        apps: 'Apps',
        ideas: 'Ideas',
        contact: 'Contacto'
    },
    hero: {
        meta: ['Madrid, España', 'PM · Estrategia · AI Ops · Transformación Digital'],
        statement: 'Construyo con IA y rediseño cómo se hace el trabajo, convirtiendo {operación} en {resultados}.',
        cta: 'Agendar llamada',
        ctaSecondary: 'Ver el trabajo'
    },
    projects: {
        eyebrow: 'Proyectos seleccionados',
        heading: 'Donde {construyo con IA} y rediseño cómo se hace el trabajo.',
        lead: 'Cuatro proyectos donde la IA cambió el proceso, no solo el slide.',
        items: [
            {
                title: 'Almazara Co-Pilot',
                org: 'IE Tech Lab · Microsoft',
                year: '2026',
                outcome: 'Un co-pilot de IA para almazaras que predice el grado del aceite en la recepción para reducir pérdidas por downgrade.',
                aiAngle: 'Visión por computadora y un modelo de grado reemplazan un control de calidad manual y tardío por una predicción explicable en tiempo real.',
                tags: ['Producto de IA', 'Visión por computadora', 'Azure', 'Rediseño de procesos'],
                accent: '#1652F0'
            },
            {
                title: 'KS Advisory AI Deal Platform',
                org: 'KS Advisory',
                year: '2026',
                outcome: 'Un sistema de agentes de IA que corre screening, research y drafting sobre un pipeline de M&A de USD 900M+.',
                aiAngle: '38 agentes especializados automatizan el flujo de research-a-memo que un equipo de deals hacía a mano.',
                tags: ['Agentes de IA', 'M&A', 'Automatización', 'Claude'],
                accent: '#0A2EAA'
            },
            {
                title: 'Aitaca M&A & Growth Strategy',
                org: 'Proyecto Final IE',
                year: '2026',
                outcome: 'Estrategia de M&A y entrada a mercado para Aitaca (sizing por visión de IA) en un horizonte de exit de 2-3 años.',
                aiAngle: 'Field research y mapeo de adquirentes convertidos en una narrativa de exit lista para el board de una startup de IA.',
                tags: ['Estrategia', 'M&A', 'Entrada a mercado', 'Startup de IA'],
                accent: '#0B0E14'
            },
            {
                title: 'Data Lake corporativo',
                org: 'Life Seguros',
                year: '2024-2025',
                outcome: 'Arquitectura del Data Lake corporativo que unifica todas las fuentes operativas y analíticas en una sola capa.',
                aiAngle: 'La base de datos única que habilita la analítica y la IA en toda la compañía. Reduje time-to-market 20%.',
                tags: ['Data Lake', 'Arquitectura', 'Analítica', 'Transformación'],
                accent: '#5D85FF'
            }
        ]
    },
    problems: {
        eyebrow: 'Cómo ayudo',
        heading: 'Seis tipos de {problemas} que resuelvo bien.',
        items: [
            {
                num: '01',
                title: 'Del apetito por transformarse a un {roadmap secuenciado}.',
                body: 'Convertir el "tenemos que modernizarnos" del comité en un plan concreto y secuenciado: qué capacidad sale primero, qué desbloquea para la siguiente, qué se compromete el equipo a 90 días.'
            },
            {
                num: '02',
                title: 'De rollouts top-down a {cambios que la gente elige}.',
                body: 'Llevar a la operación a través del cambio — escuchar al piso, exponer los trade-offs, convertir escépticos en aliados antes de que el sistema salga vivo.'
            },
            {
                num: '03',
                title: 'De repetición manual a {operación asistida por IA}.',
                body: 'Meter IA y automatización en los flujos donde tienen sentido — draftear, triagear, resumir — sin perder el juicio humano que mantiene al trabajo honesto.'
            },
            {
                num: '04',
                title: 'De releases big-bang a un {ritmo de delivery ágil}.',
                body: 'Sacar el cambio en incrementos chicos y reversibles: demo semanal, valor mensual, correcciones trimestrales. Menos ceremonia, más momentum.'
            },
            {
                num: '05',
                title: 'Del data exhaust al {insight accionable}.',
                body: 'Armar la capa analítica que convierte el ruido operativo en los dos o tres números que realmente mueven la decisión. Definición de KPIs, dashboards que se abren todas las semanas y el análisis detrás de cada gráfico.'
            },
            {
                num: '06',
                title: 'Del "deberíamos explorar opciones" a {un deal con shortlist}.',
                body: 'Asesoría en transacciones: screening de oportunidades, redacción del blind teaser, mapeo del universo de buyers, stress-test del modelo. El trabajo que convierte intención en una ronda cerrada.'
            }
        ]
    },
    track: {
        eyebrow: 'Track record',
        heading: 'Una carrera construida entre {transformación digital, datos y deals}.',
        cta: 'Ver CV completo',
        legend: { work: 'Experiencia', education: 'Formación', workShort: 'TRAB', educationShort: 'EDU' },
        cases: [
            {
                kind: 'work',
                startDate: 'Abr 2026',
                role: 'Strategy & Deal Advisor',
                org: 'KS Advisory',
                domain: null,
                logo: EXP_LOGO('ksadvisory_logo.png'),
                info: INFO.ks_advisory,
                dates: 'Abr 2026 – Presente · Madrid',
                stat: '5+',
                statLabel: 'Mandatos vivos',
                heading: 'Asesoría en {screening de deals, matching de buyers y diagnóstico de fundraising} para PyMEs en LATAM y UE.',
                body: 'Screening de oportunidades, estructura de teasers ciegos, mapeo de universos de buyers y stress-test de modelos. Sectores: construcción, hospitality, joyería y renovables. En paralelo, co-construyendo la plataforma de IA del estudio para análisis y tracking de deals.',
                tags: ['M&A', 'Estrategia', 'Due diligence', 'LATAM-EU']
            },
            {
                kind: 'education',
                startDate: 'Sep 2025',
                role: 'International MBA',
                org: 'IE Business School',
                domain: 'ie.edu',
                logo: EXP_LOGO('iebusinessschool_logo.png'),
                info: INFO.ie_business_school,
                dates: 'Sep 2025 – Jul 2026 · Madrid',
                stat: 'IMBA',
                statLabel: 'Promoción 2026',
                heading: 'MBA full-time con especialización en {Innovación y Transformación Digital de Negocios}.',
                body: 'Especialización armada alrededor de la capa operativa moderna: diseño de negocios digitales, estrategia de transformación, IA aplicada a negocio, y el cambio organizacional que cada una arrastra. Trabajando con Aitaca Remote Tech sobre el go-to-market de Virtual Sizer (medición corporal por IA para joyería y smart rings), y con Microsoft en el módulo Tech Lab.',
                tags: ['IMBA', 'Innovación Digital', 'Transformación'],
                transcript: IE_TRANSCRIPT_ES,
                clients: MBA_PARTNERS,
                clientsLabel: 'Trabajé con'
            },
            {
                role: 'Líder de Equipo IT y Project Manager',
                kind: 'work',
                startDate: 'Ago 2024',
                org: 'Life Seguros',
                domain: 'lifeseguros.com.ar',
                logo: EXP_LOGO('lifeseguros_logo.png'),
                info: INFO.life_seguros,
                dates: 'Ago 2024 – Jul 2025 · Buenos Aires',
                stat: '-20%',
                statLabel: 'Time-to-market',
                heading: 'Liderazgo IT, change management del M&A y un {Data Lake corporativo} que unifica la información de la compañía.',
                body: 'Tres workstreams en paralelo: liderazgo del equipo IT y ritmo de PM; change management del M&A con Prudential Seguros, incluyendo la integración de sistemas entre ambas aseguradoras; y arquitectura del Data Lake corporativo que centraliza todas las fuentes operativas y analíticas. Reduje time-to-market un 20% en el camino.',
                tags: ['Liderazgo de equipos', 'Change management', 'Integración de sistemas', 'Data Lake']
            },
            {
                role: 'Líder de Equipo IT y Project Manager',
                kind: 'work',
                startDate: 'Abr 2022',
                org: 'Prudential Seguros',
                domain: 'prudential.com.ar',
                logo: EXP_LOGO('prudential_logo.png'),
                info: INFO.prudential_seguros,
                dates: 'Abr 2022 – Jul 2024 · Buenos Aires',
                stat: 'IT + Analytics',
                statLabel: 'Liderazgo cross-funcional',
                heading: 'Liderazgo de equipos cross-funcionales y {entrega Agile} para el stack tecnológico del seguro.',
                body: 'Conocí a Prudential primero como cliente de MicroStrategy; me sumé in-house a liderar el workstream de IT y analítica. Armé el ritmo Agile, mantuve MicroStrategy como columna analítica y coordiné delivery entre IT, operaciones y negocio.',
                tags: ['MicroStrategy', 'Agile', 'Liderazgo cross-funcional', 'IT Project Management']
            },
            {
                role: 'BI Consultant',
                kind: 'work',
                startDate: 'Ago 2017',
                org: 'MicroStrategy Inc.',
                domain: 'microstrategy.com',
                logo: EXP_LOGO('microstrategy_logo.png'),
                info: INFO.microstrategy,
                dates: 'Ago 2017 – Mar 2022 · LATAM',
                stat: '13',
                statLabel: 'Clientes enterprise',
                heading: 'Cinco años implementando {BI enterprise} para bancos, aseguradoras, retail y sector público de LATAM.',
                body: 'Consultoría end-to-end en proyectos BI enterprise, mano a mano con los equipos de cada cliente desde planificación del proyecto hasta diseño del modelo de datos, construcción de reportes y dashboards, y entrenamiento de usuarios finales. Modelos predictivos en Python y RScript, y onboarding de nuevos consultores MicroStrategy en la práctica LATAM. La base de todo lo que vino después: cómo hablarle a un CFO, cómo aterrizar un dashboard, cómo correr un proyecto.',
                tags: ['MicroStrategy', 'SQL', 'Python', 'RScript', 'Modelado de datos', 'Project Management'],
                clients: MSTR_CLIENTS,
                clientsLabel: 'Clientes seleccionados'
            },
            {
                role: 'Licenciatura en Administración y Sistemas',
                kind: 'education',
                startDate: 'Jul 2013',
                org: 'ITBA — Instituto Tecnológico de Buenos Aires',
                domain: 'itba.edu.ar',
                logo: EXP_LOGO('itba_logo.png'),
                info: INFO.itba,
                dates: 'Jul 2013 – Jul 2017 · Buenos Aires',
                stat: '2017',
                statLabel: 'Egresado',
                heading: 'Cuatro años combinando {administración y sistemas} en una de las escuelas de ingeniería más exigentes de Argentina.',
                body: 'Carrera de 4 años que combina estrategia de negocio y sistemas de información: management, contabilidad, microeconomía y operaciones por un lado; estructuras de datos, bases de datos, programación y diseño de sistemas por el otro. Construida alrededor de la idea de que las decisiones tecnológicas son decisiones de negocio, y viceversa.',
                tags: ['Negocios + Tech', 'Sistemas de Información', 'Toma de decisiones']
            }
        ]
    },
    apps: {
        eyebrow: 'Herramientas de IA y automatizaciones que lancé',
        heading: 'Pequeños {productos de IA} que construyo para llevar ideas a producción.',
        lead: 'Prototipos que lanzo para testear una idea, automatizar un proceso o probar un flujo de IA de punta a punta. Todos viven en Vercel.',
        items: APPS.map(a => ({ ...a, desc: a.desc.es }))
    },
    logos: {
        eyebrow: 'Empresas e instituciones',
        groups: [
            { label: 'Donde estudié y trabajé', items: LOGOS_WORKED },
            { label: 'Colaboraciones por proyectos', items: LOGOS_PROJECTS }
        ]
    },
    principles: {
        eyebrow: 'Cómo corro un proyecto',
        heading: 'Algunas {creencias} que moldean cómo corro un proyecto.',
        items: [
            {
                num: '01',
                title: 'Delivery le gana al deck.',
                body: 'Una v1 funcionando enseña más que tres meses de planning. Salir a producción, después formalizar lo que probó.'
            },
            {
                num: '02',
                title: 'Que el número argumente primero.',
                body: 'Cada recomendación empieza con una métrica. Si el número no arma el caso, no hay narrativa que lo arregle.'
            },
            {
                num: '03',
                title: 'IA es copiloto, no entregable.',
                body: 'La uso todos los días — drafting, análisis, prototipos. Un modelo nunca firma sin un humano que responda.'
            },
            {
                num: '04',
                title: 'Ritmo sobre heroísmo.',
                body: 'Los proyectos fallan en las semanas intermedias. Checkpoints semanales, owners por línea — eso es lo que compone.'
            }
        ]
    },
    ai: {
        eyebrow: 'Proyectos E2E de IA',
        heading: 'Cómo llevo una idea de IA del {whiteboard a producción}.',
        lead: 'Cinco pasos. Cada uno se gana el siguiente.',
        flow: ['01 Discovery', '02 Datos', '03 Build', '04 Adopción', '05 Iteración'],
        steps: [
            {
                num: 'Paso 01',
                title: 'Discovery y framing',
                body: 'Hablar con stakeholders, scopear el problema honestamente. Decidir qué resuelve la IA y qué no.',
                tools: 'Notion · Miro · 1:1 · Figma / Canva'
            },
            {
                num: 'Paso 02',
                title: 'Auditoría y preparación de datos',
                body: 'Mapear fuentes, limpiar calidad, armar la capa de datos sobre la que vive el modelo. Ningún modelo sobrevive a data mala.',
                tools: 'Databases · Python · dbt'
            },
            {
                num: 'Paso 03',
                title: 'POC a producción',
                body: 'Diseño de prompts, selección de modelos, pipelines, evals, monitoring. Sacar lo más chico útil, después endurecer.',
                tools: 'Claude · OpenAI · Gemini · n8n'
            },
            {
                num: 'Paso 04',
                title: 'Adopción y cambio',
                body: 'Entrenar usuarios, embeber en el flujo, documentar el playbook. IA que nadie usa es teatro.',
                tools: 'Notion · Loom · Sesiones'
            },
            {
                num: 'Paso 05',
                title: 'Iteración y evolución',
                body: 'Medir uso, capturar feedback, reentrenar, retirar lo que no aporta.',
                tools: 'Feedback loops'
            }
        ]
    },
    contact: {
        eyebrow: 'Hablemos',
        heading: 'Para trabajo, advisory o un {café} en Madrid.',
        lead: 'Abierto a advisory y project leadership en transformación digital, AI ops y datos, en LATAM y Europa. Actualmente cursando el IMBA en IE Business School, con base en Madrid.',
        links: [
            { label: 'Email', value: 'agugliuzzapicci@gmail.com', href: 'mailto:agugliuzzapicci@gmail.com', action: 'Escribir' },
            { label: 'WhatsApp', value: '+34 610 01 05 76', href: 'https://wa.me/34610010576', action: 'Mensaje' },
            { label: 'LinkedIn', value: '/in/agustin-gugliuzza', href: 'https://linkedin.com/in/agustin-gugliuzza', action: 'Conectar' },
            { label: 'Twitter', value: '@agusgugliu', href: 'https://x.com/agusgugliu', action: 'Seguir' },
            { label: 'Agenda', value: 'Reservar 30 min', href: 'https://app.reclaim.ai/m/agustin-gugliuzza/high-priority', action: 'Reclaim' }
        ]
    },
    footer: {
        name: 'Agustín Gugliuzza.',
        meta: 'Madrid · 2026',
        credit: 'Hecho con React + Vite, hosteado en Vercel.',
        backToTop: 'Volver arriba',
        socials: [
            { platform: 'twitter', href: 'https://x.com/agusgugliu', label: 'Twitter' },
            { platform: 'github', href: 'https://github.com/agusgugliu', label: 'GitHub' },
            { platform: 'linkedin', href: 'https://linkedin.com/in/agustin-gugliuzza', label: 'LinkedIn' }
        ]
    }
};
