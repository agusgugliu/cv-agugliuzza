// Portfolio mode content — editorial narrative, distinct from cvData.js
// Words wrapped in {italic} render in Instrument Serif italic + blue accent.

const MSTR_CLIENTS = [
    { name: 'Prudential', domain: 'prudential.com.ar' },
    { name: 'Mercado Libre', domain: 'mercadolibre.com' },
    { name: 'Sullair', domain: 'sullair.com' },
    { name: 'AGEA (Clarín)', domain: 'clarin.com' },
    { name: 'Swiss Medical', domain: 'swissmedical.com.ar' },
    { name: 'Arcor', domain: 'arcor.com' },
    { name: 'Banco General de Panamá', domain: 'bgeneral.com' },
    { name: 'Wawanesa Insurance', domain: 'wawanesa.com' },
    { name: 'Banco Hipotecario', domain: 'hipotecario.com.ar' },
    { name: 'Banco Supervielle', domain: 'supervielle.com.ar' },
    { name: 'Banco Patagonia', domain: 'bancopatagonia.com.ar' },
    { name: 'Grupo Techint', domain: 'techint.com' },
    { name: 'AFIP', domain: 'afip.gob.ar' }
];

const APPS = [
    {
        name: 'Lect.io',
        desc: { en: 'Intelligent reading companion for digital books.', es: 'Compañero de lectura inteligente para libros digitales.' },
        url: 'https://agusgugliu-lectio.vercel.app',
        initial: 'L',
        color: '#1652F0'
    },
    {
        name: 'Kick-Off Central',
        desc: { en: 'Soccer hub with match schedules, stats and league management.', es: 'Hub de fútbol con fixtures, stats y gestión de ligas.' },
        url: 'https://agusgugliu-soccer-hub.vercel.app',
        initial: 'K',
        color: '#0A2EAA'
    },
    {
        name: 'Terranova',
        desc: { en: 'Strategic platform for resource management and exploration.', es: 'Plataforma estratégica de gestión y exploración de recursos.' },
        url: 'https://imba-s5-terranova.vercel.app',
        initial: 'T',
        color: '#0B0E14'
    },
    {
        name: 'Neighborly',
        desc: { en: 'Friendly local network to connect with your community.', es: 'Red local para conectar con tu comunidad.' },
        url: 'https://neighborly-io.vercel.app',
        initial: 'N',
        color: '#1652F0'
    },
    {
        name: 'Sanctuary 75',
        desc: { en: 'Holistic wellness tracker for the 75-day challenge.', es: 'Tracker holístico para el reto de 75 días.' },
        url: 'https://75-holistic.vercel.app',
        initial: 'S',
        color: '#0A2EAA'
    },
    {
        name: 'GeoPulse',
        desc: { en: 'Real-time geospatial analytics for data-driven decisions.', es: 'Analítica geoespacial en tiempo real para decisiones data-driven.' },
        url: 'https://geopulse-app.vercel.app',
        initial: 'G',
        color: '#0B0E14'
    },
    {
        name: 'YearView',
        desc: { en: 'A full-year calendar view for better long-range planning.', es: 'Vista de calendario anual para mejor planificación a largo plazo.' },
        url: 'https://yearviewcal.vercel.app',
        initial: 'Y',
        color: '#1652F0'
    }
];

const EXP_LOGO = (file) => `/assets/experience_logos/${file}`;

const LOGOS_BAND = [
    { name: 'IE Business School', domain: 'ie.edu', logo: EXP_LOGO('iebusinessschool_logo.png') },
    { name: 'LIFE Seguros', domain: 'lifeseguros.com.ar', logo: EXP_LOGO('lifeseguros_logo.png') },
    { name: 'Prudential', domain: 'prudential.com.ar', logo: EXP_LOGO('prudential_logo.png') },
    { name: 'MicroStrategy', domain: 'microstrategy.com', logo: EXP_LOGO('microstrategy_logo.png') },
    { name: 'KS Advisory', domain: null, logo: EXP_LOGO('ksadvisory_logo.png') },
    { name: 'ITBA', domain: 'itba.edu.ar', logo: EXP_LOGO('itba_logo.png') },
    { name: 'Mercado Libre', domain: 'mercadolibre.com' },
    { name: 'Techint', domain: 'techint.com' }
];

export const portfolioEN = {
    nav: {
        portfolio: 'Portfolio',
        cv: 'CV view',
        downloadPdf: 'PDF',
        work: 'Work',
        apps: 'Apps',
        ideas: 'Ideas',
        contact: 'Contact'
    },
    hero: {
        meta: ['Madrid, Spain', 'PM · Strategy · AI'],
        statement: 'Project and strategy leadership for companies turning {operations} into {outcomes}.',
        cta: 'Book a call',
        ctaSecondary: 'Read the long form'
    },
    problems: {
        eyebrow: 'What I help with',
        heading: 'Four kinds of {problems} I solve well.',
        items: [
            {
                num: '01',
                title: 'From scattered initiatives to {PMO governance}.',
                body: 'Bringing structure to portfolios that grew faster than the operating model around them: WBS, milestone tracking, stage gates, and the discipline to actually close projects.'
            },
            {
                num: '02',
                title: 'From manual workflows to an {operating rhythm}.',
                body: 'Mapping the work people do every week, removing the duplication, and replacing it with simple automation and clearer ownership — without forcing a new tool stack on the team.'
            },
            {
                num: '03',
                title: 'From data silos to {decisions you can defend}.',
                body: 'Turning fragmented sources into one reporting layer leadership can trust: KPI definitions, BI dashboards, and the analysis that goes with them.'
            },
            {
                num: '04',
                title: 'From strategy on slides to {delivery on the ground}.',
                body: 'Translating board-level intent into roadmaps, sequencing, and a delivery cadence that survives the first contact with reality.'
            }
        ]
    },
    track: {
        eyebrow: 'Track record',
        heading: 'A career built around {delivery}, across BI, PMO and strategy.',
        cta: 'See full CV',
        legend: { work: 'Work', education: 'Education', workShort: 'WORK', educationShort: 'EDU' },
        cases: [
            {
                kind: 'work',
                role: 'Strategy & Deal Advisor',
                org: 'KS Advisory',
                domain: null,
                logo: EXP_LOGO('ksadvisory_logo.png'),
                dates: 'Apr 2026 – Present · Madrid',
                stat: '5+',
                statLabel: 'Live mandates',
                heading: 'Advising on {deal screening, buyer matching, and fundraising diagnostics} for SMEs in LATAM and EU.',
                body: 'Screening opportunities, structuring blind teasers, mapping buyer universes, and pressure-testing financial models. Work spans construction, hospitality, jewelry, and renewables.',
                tags: ['M&A', 'Strategy', 'Due diligence', 'LATAM-EU']
            },
            {
                kind: 'education',
                role: 'International MBA',
                org: 'IE Business School',
                domain: 'ie.edu',
                logo: EXP_LOGO('iebusinessschool_logo.png'),
                dates: 'Sep 2025 – Jul 2026 · Madrid',
                stat: 'IMBA',
                statLabel: 'Class of 2026',
                heading: 'Full-time {IMBA} with a Term 3 concentration in AI for business and digital strategy.',
                body: 'Capstone with Aitaca Remote Tech on the go-to-market thesis for Virtual Sizer, an AI photo-based body-measurement product for jewelry and smart rings.',
                tags: ['IMBA', 'AI for business', 'Digital strategy', 'Capstone']
            },
            {
                role: 'IT Team Lead & Project Manager',
                kind: 'work',
                org: 'LIFE Seguros',
                domain: 'lifeseguros.com.ar',
                logo: EXP_LOGO('lifeseguros_logo.png'),
                dates: 'Aug 2024 – Jul 2025 · Buenos Aires',
                stat: '-20%',
                statLabel: 'Time-to-market',
                heading: 'Led the {ICT portfolio} through the M&A integration with Prudential Seguros.',
                body: 'Ran governance, vendor coordination, and milestone-based delivery across a multi-vendor environment. Cut time-to-market by 20% while absorbing the operating model changes from the merger.',
                tags: ['PMO', 'Team leadership', 'M&A integration', 'Insurance']
            },
            {
                role: 'IT Team Leader & Project Manager',
                kind: 'work',
                org: 'Prudential Seguros',
                domain: 'prudential.com.ar',
                logo: EXP_LOGO('prudential_logo.png'),
                dates: 'Apr 2022 – Jul 2024 · Buenos Aires',
                stat: 'Agile',
                statLabel: 'Cross-functional teams',
                heading: 'Cross-functional team leadership and {Agile delivery} for the insurance technology stack.',
                body: 'First met Prudential as a MicroStrategy client; joined the team in-house to lead the BI and analytics workstream. Set up the Agile cadence, owned PowerBI reporting, and coordinated delivery across IT, operations, and the business.',
                tags: ['PowerBI', 'Agile', 'Cross-functional leadership', 'Insurance']
            },
            {
                role: 'BI Consultant',
                kind: 'work',
                org: 'MicroStrategy Inc.',
                domain: 'microstrategy.com',
                logo: EXP_LOGO('microstrategy_logo.png'),
                dates: 'Aug 2017 – Mar 2022 · LATAM',
                stat: '13',
                statLabel: 'Enterprise clients',
                heading: 'Five years implementing {enterprise BI} for banks, insurers, retailers and the public sector across LATAM.',
                body: 'Architected MicroStrategy deployments, designed semantic layers, and ran project delivery for clients across banking, insurance, retail, telco and the public sector. The base for everything that came after: how to talk to a CFO, how to land a dashboard, how to run a project.',
                tags: ['MicroStrategy', 'SQL', 'Database architecture', 'Project Management', 'Strategy'],
                clients: MSTR_CLIENTS,
                clientsLabel: 'Selected clients'
            },
            {
                role: 'Bachelor in Management & Information Systems',
                kind: 'education',
                org: 'ITBA — Instituto Tecnológico de Buenos Aires',
                domain: 'itba.edu.ar',
                logo: EXP_LOGO('itba_logo.png'),
                dates: 'Jul 2013 – Jul 2017 · Buenos Aires',
                stat: '2017',
                statLabel: 'Graduated',
                heading: 'Five-year bachelor blending {management and information systems} at one of Argentina\'s top engineering schools.',
                body: 'The dual focus — engineering rigor plus business framing — set the lane I have walked since: technology projects judged by what they actually deliver to the operation.',
                tags: ['Management', 'Information Systems', 'ITBA']
            }
        ]
    },
    apps: {
        eyebrow: 'Things I have built',
        heading: 'Side {projects} and apps shipped in the open.',
        lead: 'Small products I built to test ideas, learn a stack, or just scratch an itch. All live on Vercel.',
        items: APPS.map(a => ({ ...a, desc: a.desc.en }))
    },
    logos: {
        eyebrow: 'Companies and institutions',
        items: LOGOS_BAND
    },
    principles: {
        eyebrow: 'How I think about delivery',
        heading: 'A few {beliefs} that shape how I run a project.',
        items: [
            {
                num: '01',
                title: 'Delivery beats deck.',
                body: 'A working v1 in production teaches you more than three months of polished planning. Move fast, then formalize the parts that proved themselves.'
            },
            {
                num: '02',
                title: 'Make the number argue first.',
                body: 'Every recommendation starts with a metric. If the number does not make the case, no amount of narrative will.'
            },
            {
                num: '03',
                title: 'AI is a copilot, not a deliverable.',
                body: 'I use AI daily to compress analysis, draft executive comms, and prototype automation — but a model never ships work without a human accountable for it.'
            },
            {
                num: '04',
                title: 'Cadence over heroics.',
                body: 'Most projects fail in the in-between weeks, not at the milestones. The rhythm — weekly checkpoints, owners on every line — is what compounds.'
            }
        ]
    },
    ai: {
        eyebrow: 'How I work with AI',
        heading: 'AI as a modern {operating layer}, grounded in business judgment.',
        lead: 'I use AI every day to accelerate analysis, structure reporting, draft executive narrative, and explore automation. It changes the speed and the surface area — not the judgment.',
        flow: ['01 Information', '02 Analysis', '03 Executive narrative', '04 Decision support'],
        steps: [
            {
                num: 'Step 01',
                title: 'Information',
                body: 'Turn messy exports, threads, and operational docs into structured context the workflow can act on.',
                tools: 'Claude · ChatGPT · n8n'
            },
            {
                num: 'Step 02',
                title: 'Analysis',
                body: 'Run the math, the model, the comparison. Stress-test the assumptions and surface the edge cases.',
                tools: 'Python · SQL · Tableau'
            },
            {
                num: 'Step 03',
                title: 'Executive narrative',
                body: 'Compress findings into a one-pager or a deck section. Make the recommendation land in under 60 seconds.',
                tools: 'Claude · DM Sans · Markdown'
            },
            {
                num: 'Step 04',
                title: 'Decision support',
                body: 'Stand by the recommendation in the room. The model drafts; the operator decides and owns the outcome.',
                tools: 'Notion · Obsidian · Loom'
            }
        ]
    },
    contact: {
        eyebrow: 'Start a conversation',
        heading: 'For work, advisory, or a {coffee} in Madrid.',
        lead: 'Open to project leadership, strategy consulting, and advisory roles across LATAM and Europe. Currently completing the IMBA at IE Business School and based in Madrid.',
        links: [
            { label: 'Email', value: 'agustin.gugliuzza.piccinini@gmail.com', href: 'mailto:agustin.gugliuzza.piccinini@gmail.com', action: 'Write' },
            { label: 'LinkedIn', value: '/in/agustin-gugliuzza', href: 'https://linkedin.com/in/agustin-gugliuzza', action: 'Connect' },
            { label: 'Schedule', value: 'Book a 30-min call', href: 'https://app.reclaim.ai/m/agustin-gugliuzza/high-priority', action: 'Reclaim' }
        ]
    },
    footer: {
        left: '© 2026 Agustín Gugliuzza · Madrid',
        right: 'Built with React + framer-motion'
    }
};

export const portfolioES = {
    nav: {
        portfolio: 'Portfolio',
        cv: 'Vista CV',
        downloadPdf: 'PDF',
        work: 'Trabajo',
        apps: 'Apps',
        ideas: 'Ideas',
        contact: 'Contacto'
    },
    hero: {
        meta: ['Madrid, España', 'PM · Estrategia · IA'],
        statement: 'Liderazgo de proyectos y estrategia para empresas que convierten {operación} en {resultados}.',
        cta: 'Agendar llamada',
        ctaSecondary: 'Leer la versión larga'
    },
    problems: {
        eyebrow: 'Cómo ayudo',
        heading: 'Cuatro tipos de {problemas} que resuelvo bien.',
        items: [
            {
                num: '01',
                title: 'De iniciativas dispersas a {gobernanza PMO}.',
                body: 'Estructurar portafolios que crecieron más rápido que el modelo operativo: WBS, milestones, stage gates, y la disciplina para cerrar proyectos de verdad.'
            },
            {
                num: '02',
                title: 'De flujos manuales a un {ritmo operativo}.',
                body: 'Mapear el trabajo semanal, eliminar duplicación y reemplazarlo con automatización simple y ownership claro — sin imponer un stack nuevo al equipo.'
            },
            {
                num: '03',
                title: 'De silos de datos a {decisiones defendibles}.',
                body: 'Convertir fuentes fragmentadas en una capa de reporting que el liderazgo pueda confiar: definiciones de KPIs, dashboards BI y el análisis que los acompaña.'
            },
            {
                num: '04',
                title: 'De estrategia en slides a {ejecución en el terreno}.',
                body: 'Traducir intención del comité a roadmaps, secuencia y un ritmo de delivery que sobreviva al primer contacto con la realidad.'
            }
        ]
    },
    track: {
        eyebrow: 'Track record',
        heading: 'Una carrera construida sobre {entrega real}, entre BI, PMO y estrategia.',
        cta: 'Ver CV completo',
        legend: { work: 'Experiencia', education: 'Formación', workShort: 'TRAB', educationShort: 'EDU' },
        cases: [
            {
                kind: 'work',
                role: 'Strategy & Deal Advisor',
                org: 'KS Advisory',
                domain: null,
                logo: EXP_LOGO('ksadvisory_logo.png'),
                dates: 'Abr 2026 – Presente · Madrid',
                stat: '5+',
                statLabel: 'Mandatos vivos',
                heading: 'Asesoría en {screening de deals, matching de buyers y diagnóstico de fundraising} para PyMEs en LATAM y UE.',
                body: 'Screening de oportunidades, estructura de teasers ciegos, mapeo de universos de buyers y stress-test de modelos. Sectores: construcción, hospitality, joyería y renovables.',
                tags: ['M&A', 'Estrategia', 'Due diligence', 'LATAM-EU']
            },
            {
                kind: 'education',
                role: 'International MBA',
                org: 'IE Business School',
                domain: 'ie.edu',
                logo: EXP_LOGO('iebusinessschool_logo.png'),
                dates: 'Sep 2025 – Jul 2026 · Madrid',
                stat: 'IMBA',
                statLabel: 'Promoción 2026',
                heading: 'IMBA full-time con concentración en Term 3 en {IA para negocios} y estrategia digital.',
                body: 'Capstone con Aitaca Remote Tech sobre el go-to-market de Virtual Sizer, un producto de medición corporal por IA para joyería y smart rings.',
                tags: ['IMBA', 'IA para negocios', 'Estrategia digital', 'Capstone']
            },
            {
                role: 'Líder de Equipo IT y Project Manager',
                kind: 'work',
                org: 'LIFE Seguros',
                domain: 'lifeseguros.com.ar',
                logo: EXP_LOGO('lifeseguros_logo.png'),
                dates: 'Ago 2024 – Jul 2025 · Buenos Aires',
                stat: '-20%',
                statLabel: 'Time-to-market',
                heading: 'Lideré el {portafolio ICT} durante la integración M&A con Prudential Seguros.',
                body: 'Gobernanza, coordinación de vendors y delivery por milestones en entorno multi-vendor. Reduje time-to-market un 20% absorbiendo los cambios del modelo operativo del merger.',
                tags: ['PMO', 'Liderazgo de equipos', 'Integración M&A', 'Seguros']
            },
            {
                role: 'Líder de Equipo IT y Project Manager',
                kind: 'work',
                org: 'Prudential Seguros',
                domain: 'prudential.com.ar',
                logo: EXP_LOGO('prudential_logo.png'),
                dates: 'Abr 2022 – Jul 2024 · Buenos Aires',
                stat: 'Agile',
                statLabel: 'Equipos cross-funcionales',
                heading: 'Liderazgo de equipos cross-funcionales y {entrega Agile} para el stack tecnológico del seguro.',
                body: 'Conocí a Prudential primero como cliente de MicroStrategy; me sumé in-house a liderar el workstream de BI y analítica. Armé el ritmo Agile, owner de reporting PowerBI, y coordiné delivery entre IT, operaciones y negocio.',
                tags: ['PowerBI', 'Agile', 'Liderazgo cross-funcional', 'Seguros']
            },
            {
                role: 'BI Consultant',
                kind: 'work',
                org: 'MicroStrategy Inc.',
                domain: 'microstrategy.com',
                logo: EXP_LOGO('microstrategy_logo.png'),
                dates: 'Ago 2017 – Mar 2022 · LATAM',
                stat: '13',
                statLabel: 'Clientes enterprise',
                heading: 'Cinco años implementando {BI enterprise} para bancos, aseguradoras, retail y sector público de LATAM.',
                body: 'Arquitectura de despliegues MicroStrategy, diseño de capas semánticas y conducción de delivery para clientes en banca, seguros, retail, telco y sector público. La base de todo lo que vino después: cómo hablarle a un CFO, cómo aterrizar un dashboard, cómo correr un proyecto.',
                tags: ['MicroStrategy', 'SQL', 'Arquitectura de datos', 'Project Management', 'Estrategia'],
                clients: MSTR_CLIENTS,
                clientsLabel: 'Clientes seleccionados'
            },
            {
                role: 'Licenciatura en Administración y Sistemas',
                kind: 'education',
                org: 'ITBA — Instituto Tecnológico de Buenos Aires',
                domain: 'itba.edu.ar',
                logo: EXP_LOGO('itba_logo.png'),
                dates: 'Jul 2013 – Jul 2017 · Buenos Aires',
                stat: '2017',
                statLabel: 'Egresado',
                heading: 'Cinco años combinando {administración y sistemas} en una de las escuelas de ingeniería más exigentes de Argentina.',
                body: 'Ese doble foco —rigor de ingeniería más framing de negocio— marcó el carril en el que vengo caminando: proyectos de tecnología juzgados por lo que entregan a la operación.',
                tags: ['Administración', 'Sistemas', 'ITBA']
            }
        ]
    },
    apps: {
        eyebrow: 'Cosas que construí',
        heading: 'Side {projects} y apps en abierto.',
        lead: 'Productos chicos para probar ideas, aprender un stack o sacar una espina. Todos viven en Vercel.',
        items: APPS.map(a => ({ ...a, desc: a.desc.es }))
    },
    logos: {
        eyebrow: 'Empresas e instituciones',
        items: LOGOS_BAND
    },
    principles: {
        eyebrow: 'Cómo pienso el delivery',
        heading: 'Algunas {creencias} que moldean cómo corro un proyecto.',
        items: [
            {
                num: '01',
                title: 'Delivery le gana al deck.',
                body: 'Una v1 funcionando en producción enseña más que tres meses de planning pulido. Avanzar rápido y formalizar después lo que se probó.'
            },
            {
                num: '02',
                title: 'Que el número argumente primero.',
                body: 'Cada recomendación empieza con una métrica. Si el número no arma el caso, no hay narrativa que lo arregle.'
            },
            {
                num: '03',
                title: 'IA es copiloto, no entregable.',
                body: 'Uso IA todos los días para comprimir análisis, redactar comms ejecutivas y prototipar automatización — pero un modelo nunca firma trabajo sin un humano que responda por él.'
            },
            {
                num: '04',
                title: 'Ritmo sobre heroísmo.',
                body: 'La mayoría de los proyectos fallan en las semanas intermedias, no en los milestones. El ritmo —checkpoints semanales, owners por línea— es lo que compone.'
            }
        ]
    },
    ai: {
        eyebrow: 'Cómo trabajo con IA',
        heading: 'IA como {capa operativa moderna}, anclada en juicio de negocio.',
        lead: 'Uso IA a diario para acelerar análisis, estructurar reporting, redactar narrativa ejecutiva y explorar automatización. Cambia la velocidad y la superficie — no el juicio.',
        flow: ['01 Información', '02 Análisis', '03 Narrativa ejecutiva', '04 Soporte a decisiones'],
        steps: [
            {
                num: 'Paso 01',
                title: 'Información',
                body: 'Convertir exports desordenados, hilos de mail y docs operativos en contexto estructurado sobre el que se puede operar.',
                tools: 'Claude · ChatGPT · n8n'
            },
            {
                num: 'Paso 02',
                title: 'Análisis',
                body: 'Correr la cuenta, el modelo, la comparación. Stress-testear supuestos y exponer edge cases.',
                tools: 'Python · SQL · Tableau'
            },
            {
                num: 'Paso 03',
                title: 'Narrativa ejecutiva',
                body: 'Comprimir hallazgos en un one-pager o una sección de deck. Que la recomendación aterrice en menos de 60 segundos.',
                tools: 'Claude · DM Sans · Markdown'
            },
            {
                num: 'Paso 04',
                title: 'Soporte a decisiones',
                body: 'Bancar la recomendación en la sala. El modelo redacta; el operador decide y se hace dueño del resultado.',
                tools: 'Notion · Obsidian · Loom'
            }
        ]
    },
    contact: {
        eyebrow: 'Hablemos',
        heading: 'Para trabajo, advisory o un {café} en Madrid.',
        lead: 'Abierto a roles de project leadership, consultoría estratégica y advisory en LATAM y Europa. Actualmente cursando el IMBA en IE Business School, con base en Madrid.',
        links: [
            { label: 'Email', value: 'agustin.gugliuzza.piccinini@gmail.com', href: 'mailto:agustin.gugliuzza.piccinini@gmail.com', action: 'Escribir' },
            { label: 'LinkedIn', value: '/in/agustin-gugliuzza', href: 'https://linkedin.com/in/agustin-gugliuzza', action: 'Conectar' },
            { label: 'Agenda', value: 'Reservar 30 min', href: 'https://app.reclaim.ai/m/agustin-gugliuzza/high-priority', action: 'Reclaim' }
        ]
    },
    footer: {
        left: '© 2026 Agustín Gugliuzza · Madrid',
        right: 'Hecho con React + framer-motion'
    }
};
