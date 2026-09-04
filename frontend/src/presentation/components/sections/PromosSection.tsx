import { motion } from 'framer-motion';
import { promos } from '../../../infrastructure/data/initialData';
import type { Promo } from '../../../infrastructure/data/initialData';
import { FlameIcon } from '../icons/CustomIcons';

function LootCard({ promo }: { promo: Promo }) {
  const c1 = promo.c1 || '#1a2a2e';
  const c2 = promo.c2 || '#5df0d8';
  const rareza = promo.rareza || 'COMUN';
  const icono = promo.icono || '🎁';
  const dropFill = promo.dropPercent ?? 50;

  let statLabel = 'DISPONIBILIDAD';
  let statValue = 'En Barra';
  let isPrice = false;

  if (promo.precioPromo) {
    statLabel = 'PRECIO';
    isPrice = true;
  } else if (promo.horaInicio && promo.horaFin) {
    statLabel = 'HORARIO';
    statValue = `${promo.horaInicio} – ${promo.horaFin}`;
  } else if (promo.dias && promo.dias.length > 0) {
    statLabel = 'DIAS';
    statValue = promo.dias.length >= 4 ? 'Dom – Jue' : promo.dias.join(', ');
  }

  return (
    <div
      className="loot"
      style={{ '--c1': c1, '--c2': c2 } as React.CSSProperties}
      role="article"
      aria-label={`${promo.titulo} — ${rareza}`}
    >
      <div className="loot-inner">
        <div className="rarity-ribbon">{rareza}</div>

        <div>
          <div className="rarity-tag">
            <span className="gem" aria-hidden="true" />
            <span>{rareza}</span>
          </div>

          <div className="icon-box" aria-hidden="true">
            {icono}
          </div>

          <h3>{promo.titulo}</h3>
          <p>{promo.descripcion}</p>
        </div>

        <div>
          <div className="stat-row">
            <span className="stat-label">{statLabel}</span>
            {isPrice ? (
              <span className="price-tag">${promo.precioPromo?.toFixed(2)}</span>
            ) : (
              <span className="stat-value">{statValue}</span>
            )}
          </div>

          <div className="drop-bar">
            <div className="drop-fill" style={{ width: `${dropFill}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   PROMOS TICKER
   ────────────────────────────────────────────── */
function PromoTicker() {
  const items = [
    '2x1 Mojitos — Lun a Jue, 4pm a 7pm',
    'Nave de Cotufas de Pollo 2x1 — $7',
    'Gamer Pack: 1h Consola + Burger + Bebida — $12',
    'Burgers 2x1 — Dom a Jue',
    'Happy Hour — Cocteles Seleccionados',
    '2x1 Mojitos — Lun a Jue, 4pm a 7pm',
    'Nave de Cotufas de Pollo 2x1 — $7',
    'Gamer Pack: 1h Consola + Burger + Bebida — $12',
    'Burgers 2x1 — Dom a Jue',
    'Happy Hour — Cocteles Seleccionados',
  ];

  return (
    <div className="ticker-container" aria-label="Promociones activas" role="marquee">
      <div className="ticker-track" aria-hidden="true">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-3 text-white text-[12px] font-bold uppercase tracking-widest whitespace-nowrap">
            <FlameIcon size={12} className="text-white opacity-70" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   PROMOS SECTION — RPG Loot Card Layout
   ────────────────────────────────────────────── */
export function PromosSection() {
  return (
    <>
      <PromoTicker />

      <section id="promos" className="relative py-24" aria-labelledby="promos-heading">
        <div className="absolute top-0 right-0 w-125 h-100 rounded-full bg-brand-pink/4 blur-[100px] -z-10" aria-hidden="true" />

        <div className="container-site">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 max-w-175"
          >
            <div className="w-11.5 h-1 rounded-full bg-linear-to-r from-brand-cyan to-brand-purple mb-4" />
            <h2 id="promos-heading" className="text-[40px] font-extrabold italic text-white leading-tight">
              Promociones de la Semana
            </h2>
            <p className="text-[#b6b6c0] text-[15px] leading-relaxed mt-3">
              Precios especiales, combos exclusivos y deals que no puedes dejar pasar. Pregunta en barra por las promos del dia.
            </p>
          </motion.div>

          {/* Promos Grid — 4 Columns Loot Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5.5">
            {promos.filter(p => p.activa).map((promo, i) => (
              <motion.div
                key={promo.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="h-full"
              >
                <LootCard promo={promo} />
              </motion.div>
            ))}
          </div>

          {/* Foot note */}
          <p className="text-center text-[11px] text-[#6f6f7a] mt-11">
            Precios expresados en USD. Promos validas hasta agotar stock o hasta nueva actualizacion. Consulta disponibilidad en barra.
          </p>
        </div>
      </section>
    </>
  );
}
