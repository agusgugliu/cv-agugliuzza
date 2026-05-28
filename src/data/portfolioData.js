// Portfolio mode content — editorial narrative, distinct from cvData.js
// Words wrapped in {italic} render in Instrument Serif italic + blue accent.

export const portfolioEN = {
    nav: {
        portfolio: 'Portfolio',
        cv: 'CV view',
        downloadPdf: 'PDF'
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
        heading: 'Selected work across five years of {real delivery}.',
        cta: 'See full CV',
        cases: [
            {
                role: 'Project & Portfolio Lead',
                org: 'LIFE Seguros · Prudential Group',
                dates: '2022 – 2025 · Buenos Aires',
                stat: '-20%',
                statLabel: 'Time-to-market',
                heading: 'Led a {10+ project ICT portfolio} from intake to close in a multi-vendor environment.',
                body: 'Stood up the PMO governance, defined WBS structures for every initiative, and ran milestone-based delivery controls across internal teams and external vendors. The result was a measurable reduction in time-to-market and a portfolio leadership could actually steer.',
                tags: ['PMO', 'Agile', 'Multi-vendor', 'Insurance', 'Digital transformation']
            },
            {
                role: 'Strategy & Deal Advisor',
                org: 'KS Advisory',
                dates: '2026 – Present · Madrid',
                stat: '5+',
                statLabel: 'Live mandates',
                heading: 'Advising on {deal screening, buyer matching, and fundraising diagnostics} for SMEs in LATAM and EU.',
                body: 'Screening opportunities, structuring blind teasers, mapping buyer universes, and pressure-testing financial models. Work spans construction, hospitality, jewelry, and renewables.',
                tags: ['M&A', 'Strategy', 'Due diligence', 'LATAM-EU']
            },
            {
                role: 'IMBA · Final Integrative Exercise',
                org: 'IE Business School · Aitaca Remote Tech',
                dates: '2026 · Madrid',
                stat: 'AI',
                statLabel: 'Computer vision',
                heading: 'Building the go-to-market thesis for an {AI body-measurement} product in jewelry and smart rings.',
                body: 'Working with the corporate sponsor on positioning, pricing, and channel strategy for Virtual Sizer — the photo-based sizing engine reducing returns for online jewelers.',
                tags: ['Go-to-market', 'Computer vision', 'Pricing', 'Capstone']
            }
        ]
    },
    logos: {
        eyebrow: 'People I have worked with',
        items: ['LIFE Seguros', 'Prudential', 'Mercado Libre', 'IE Business School', 'KS Advisory', 'Aitaca']
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
        downloadPdf: 'PDF'
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
        heading: 'Trabajo seleccionado a lo largo de cinco años de {entrega real}.',
        cta: 'Ver CV completo',
        cases: [
            {
                role: 'Líder de Proyectos y Portafolio',
                org: 'LIFE Seguros · Grupo Prudential',
                dates: '2022 – 2025 · Buenos Aires',
                stat: '-20%',
                statLabel: 'Time-to-market',
                heading: 'Lideré un {portafolio ICT de 10+ proyectos} de intake a cierre en un entorno multi-vendor.',
                body: 'Levanté la gobernanza PMO, definí estructuras WBS para cada iniciativa y corrí controles de delivery por milestones entre equipos internos y vendors externos. Resultado: reducción medible de time-to-market y un portafolio gobernable.',
                tags: ['PMO', 'Agile', 'Multi-vendor', 'Seguros', 'Transformación digital']
            },
            {
                role: 'Strategy & Deal Advisor',
                org: 'KS Advisory',
                dates: '2026 – Presente · Madrid',
                stat: '5+',
                statLabel: 'Mandatos vivos',
                heading: 'Asesoría en {screening de deals, matching de buyers y diagnóstico de fundraising} para PyMEs en LATAM y UE.',
                body: 'Screening de oportunidades, estructura de teasers ciegos, mapeo de universos de buyers y stress-test de modelos. Sectores: construcción, hospitality, joyería y renovables.',
                tags: ['M&A', 'Estrategia', 'Due diligence', 'LATAM-EU']
            },
            {
                role: 'IMBA · Final Integrative Exercise',
                org: 'IE Business School · Aitaca Remote Tech',
                dates: '2026 · Madrid',
                stat: 'IA',
                statLabel: 'Visión por computadora',
                heading: 'Construyendo la tesis de go-to-market para un producto de {medición corporal por IA} en joyería y smart rings.',
                body: 'Trabajo con el sponsor corporativo en posicionamiento, pricing y estrategia de canal para Virtual Sizer — el motor de sizing por foto que reduce devoluciones para joyería online.',
                tags: ['Go-to-market', 'Computer vision', 'Pricing', 'Capstone']
            }
        ]
    },
    logos: {
        eyebrow: 'Con quién trabajé',
        items: ['LIFE Seguros', 'Prudential', 'Mercado Libre', 'IE Business School', 'KS Advisory', 'Aitaca']
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
