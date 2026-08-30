import { motion } from 'framer-motion';
import { promos } from '../../../infrastructure/data/initialData';
import type { Promo } from '../../../infrastructure/data/initialData';
import { ZapIcon, FlameIcon, CocktailIcon, ClockIcon, GamepadIcon } from '../icons/CustomIcons';

const COLOR_MAP: Record<string, { bg: string; text: string; border: string; badge: string }> = {
  pink:   { bg: 'from-brand-pink/10 to-transparent', text: 'text-brand-pink', border: 'border-brand-pink/20', badge: 'badge-pink' },
  cyan:   { bg: 'from-brand-cyan/10 to-transparent', text: 'text-brand-cyan', border: 'border-brand-cyan/20', badge: 'badge-cyan' },
  purple: { bg: 'from-brand-purple/10 to-transparent', text: 'text-brand-purple-light', border: 'border-brand-purple/20', badge: 'badge-purple' },
};

function PromoCard({ promo }: { promo: Promo }) {
  const c = COLOR_MAP[promo.color] || COLOR_MAP.pink;
  const PromoIcon = promo.color === 'cyan' ? CocktailIcon : promo.color === 'pink' ? FlameIcon : GamepadIcon;

  return (
    <article
      className={`promo-card bg-gradient-to-br ${c.bg} border ${c.border}`}
      aria-label={promo.titulo}
    >
      {/* BG Decoration */}
      <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-[60px] opacity-20 pointer-events-none" style={{
        background: promo.color === 'pink' ? '#FF005C' : promo.color === 'cyan' ? '#00E5FF' : '#B500FF'
      }} aria-hidden="true" />

      {/* Label */}
      {promo.etiqueta && (
        <div className={`badge ${c.badge} mb-4 relative z-10`}>
          <ZapIcon size={10} aria-hidden="true" />
          {promo.etiqueta}
        </div>
      )}

      {/* Title */}
      <div className="relative z-10 flex items-start gap-4 mb-4">
        <div className={`w-12 h-12 rounded-2xl bg-white/[0.06] border ${c.border} flex items-center justify-center ${c.text} flex-shrink-0`}>
          <PromoIcon size={24} aria-hidden="true" />
        </div>
        <div>
          <h3 className={`text-[20px] font-black text-white leading-tight mb-1`}>{promo.titulo}</h3>
          <p className="text-brand-gray text-[13px] leading-relaxed">{promo.descripcion}</p>
        </div>
      </div>

      {/* Meta Info */}
      <div className="relative z-10 flex flex-wrap gap-3 mt-4">
        {promo.dias && (
          <div className="flex items-center gap-1.5 text-[11px] text-brand-gray">
            <ClockIcon size={12} className={c.text} aria-hidden="true" />
            <span className="font-semibold">{promo.dias.join(' · ')}</span>
          </div>
        )}
        {promo.horaInicio && (
          <div className="text-[11px] text-brand-gray font-semibold">
            {promo.horaInicio} — {promo.horaFin}
          </div>
        )}
        {promo.precioPromo && (
          <div className={`text-[22px] font-black ${c.text} leading-none ml-auto`}>
            ${promo.precioPromo.toFixed(2)}
          </div>
        )}
      </div>
    </article>
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
   PROMOS SECTION
   ────────────────────────────────────────────── */
export function PromosSection() {
  return (
    <>
      <PromoTicker />

      <section id="promos" className="relative py-24" aria-labelledby="promos-heading">
        <div className="absolute top-0 right-0 w-[500px] h-[400px] rounded-full bg-brand-pink/[0.04] blur-[100px] -z-10" aria-hidden="true" />

        <div className="container-site">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="section-label text-brand-pink">Ofertas Activas</div>
            <h2 id="promos-heading" className="section-title text-white mt-2">
              <span className="section-title-deco" style={{ '--after-color': '#FF005C' } as React.CSSProperties}>
                Promociones de la Semana
              </span>
            </h2>
            <p className="text-brand-gray text-[1rem] leading-relaxed max-w-[520px] mt-6">
              Precios especiales, combos exclusivos y deals que no puedes dejar pasar. Pregunta en barra por las promos del dia.
            </p>
          </motion.div>

          {/* Promos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {promos.filter(p => p.activa).map((promo, i) => (
              <motion.div
                key={promo.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <PromoCard promo={promo} />
              </motion.div>
            ))}
          </div>

          {/* Note */}
          <p className="text-center text-[12px] text-brand-gray mt-8">
            Precios expresados en USD. Promos validas hasta agotar stock o hasta nueva actualizacion. Consulta disponibilidad en barra.
          </p>
        </div>
      </section>
    </>
  );
}
