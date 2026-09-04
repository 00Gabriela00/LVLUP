import { motion } from 'framer-motion';

/* ──────────────────────────────────────────────
   GAMING STATIONS DATA
   ────────────────────────────────────────────── */
interface GamingCard {
  id: string;
  nombre: string;
  descripcion: string;
  tipo: string;   // rareza equivalente
  icono: string;
  c1: string;
  c2: string;
  dropPercent: number;
}

const GAMING_CARDS: GamingCard[] = [
  {
    id: 'ps5',
    nombre: 'PlayStation 5',
    descripcion: 'Poder gráfico 4K HDR, audio 3D y mandos DualSense con gatillos adaptativos.',
    tipo: 'NEXT-GEN',
    icono: '🎮',
    c1: '#0a1e22',
    c2: '#35e7ff',
    dropPercent: 95,
  },
  {
    id: 'switch',
    nombre: 'Nintendo Switch',
    descripcion: 'Diversión cooperativa instantánea para grupos con mandos Joy-Con inalámbricos.',
    tipo: 'LOUNGE',
    icono: '🕹️',
    c1: '#160a22',
    c2: '#b26bff',
    dropPercent: 80,
  },
  {
    id: 'billar',
    nombre: 'Mesa de Billar',
    descripcion: 'Mesa reglamentaria con paño de alta precisión, tacos de madera y set completo.',
    tipo: 'PROFESIONAL',
    icono: '🎱',
    c1: '#200710',
    c2: '#ff4d6d',
    dropPercent: 70,
  },
  {
    id: 'jenga',
    nombre: 'Jenga Gigante XXL',
    descripcion: 'Bloques de madera maciza a escala gigante. Pulso, tensión y diversión en grupo.',
    tipo: 'ESTRATEGIA',
    icono: '🪵',
    c1: '#1e1200',
    c2: '#ffb84d',
    dropPercent: 65,
  },
  {
    id: 'pingpong',
    nombre: 'Ping Pong',
    descripcion: 'Mesa reglamentaria para duelos 1v1 o dobles con paletas pro y pelotas incluidas.',
    tipo: 'TENIS DE MESA',
    icono: '🏓',
    c1: '#071a08',
    c2: '#7be07e',
    dropPercent: 75,
  },
];

/* ──────────────────────────────────────────────
   GAMING LOOT CARD
   ────────────────────────────────────────────── */
function GamingLootCard({ card }: { card: GamingCard }) {
  return (
    <div
      className="loot"
      style={{ '--c1': card.c1, '--c2': card.c2 } as React.CSSProperties}
      role="article"
      aria-label={`${card.nombre} — ${card.tipo}`}
    >
      <div className="loot-inner">
        <div className="rarity-ribbon">{card.tipo}</div>

        <div>
          <div className="rarity-tag">
            <span className="gem" aria-hidden="true" />
            <span>{card.tipo}</span>
          </div>

          <div className="icon-box" aria-hidden="true">
            {card.icono}
          </div>

          <h3>{card.nombre}</h3>
          <p>{card.descripcion}</p>
        </div>

        <div>
          <div className="stat-row">
            <span className="stat-label">TARIFA</span>
            <span className="price-tag">$3 / $6</span>
          </div>
          <div style={{ marginTop: '6px', marginBottom: '4px' }}>
            <span style={{ fontSize: '9px', color: '#6f6f7a', letterSpacing: '0.5px' }}>
              30 MIN &nbsp;·&nbsp; 1 HORA — Pago en Caja
            </span>
          </div>

          <div className="drop-bar">
            <div className="drop-fill" style={{ width: `${card.dropPercent}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   GAMING SECTION
   ────────────────────────────────────────────── */
export function GamingSection() {
  return (
    <section id="gaming" className="relative py-24" aria-labelledby="gaming-heading">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-[-10%] w-150 h-150 rounded-full bg-[#800028]/12 blur-[140px] -z-10" aria-hidden="true" />
      <div className="absolute bottom-0 left-[-5%] w-125 h-125 rounded-full bg-brand-cyan/5 blur-[130px] -z-10" aria-hidden="true" />

      <div className="container-site">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="w-11.5 h-1 rounded-full bg-linear-to-r from-brand-cyan to-brand-purple mb-4" />
          <h2 id="gaming-heading" className="text-[40px] font-extrabold italic text-white leading-tight">
            Consolas Next-Gen &amp; Juegos de Salón
          </h2>
          <p className="text-[#b6b6c0] text-[15px] leading-relaxed mt-3">
            Tarifa única en todas las experiencias:{' '}
            <strong className="text-[#eaeaee]">$3.00 (30 minutos)</strong> y{' '}
            <strong className="text-[#eaeaee]">$6.00 (1 hora)</strong>. Todo se adquiere en caja al llegar.
          </p>
        </motion.div>

        {/* Cards Grid — same as Promos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5.5">
          {GAMING_CARDS.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="h-full"
            >
              <GamingLootCard card={card} />
            </motion.div>
          ))}
        </div>

        {/* Foot note */}
        <p className="text-center text-[11px] text-[#6f6f7a] mt-11">
          Tarifas expresadas en USD. El tiempo comienza a correr desde que se asigna la estación. Consulta disponibilidad en caja.
        </p>
      </div>
    </section>
  );
}
