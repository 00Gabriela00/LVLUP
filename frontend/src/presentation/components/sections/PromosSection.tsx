import { motion } from 'framer-motion';
import { promos } from '../../../infrastructure/data/initialData';
import type { Promo } from '../../../infrastructure/data/initialData';
import { CocktailIcon, BurgerIcon, GamepadIcon, ChickenIcon } from '../icons/CustomIcons';
import { Package, Sparkles, Trophy, Zap } from 'lucide-react';
import { formatDias } from './promoUtils';

function getPromoIcon(icono?: string) {
  switch (icono) {
    case 'cocktail':
    case '🍸':
      return <CocktailIcon size={24} />;
    case 'burger':
    case '🍔':
      return <BurgerIcon size={24} />;
    case 'gamepad':
    case '🎮':
      return <GamepadIcon size={24} />;
    case 'snack':
    case '🍗':
      return <ChickenIcon size={24} />;
    case 'trophy':
      return <Trophy size={24} />;
    case 'zap':
      return <Zap size={24} />;
    default:
      return <Sparkles size={24} />;
  }
}

function LootCard({ promo }: { promo: Promo }) {
  const c1 = promo.c1 || '#1a2a2e';
  const c2 = promo.c2 || '#5df0d8';
  const rareza = promo.rareza || 'COMUN';
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
    statValue = formatDias(promo.dias);
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

          <div className="icon-box text-(--c2) shadow-[0_0_15px_rgba(0,229,255,0.15)]" aria-hidden="true">
            {getPromoIcon(promo.icono)}
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
    { text: '2x1 Cocteles Galácticos — Lun a Jue, 4pm a 7pm', icon: <CocktailIcon size={14} /> },
    { text: 'Cofre Popcorn Chicken 2x1 — $7', icon: <ChickenIcon size={14} /> },
    { text: 'Gamer Pack: 1h Consola + Burger 180g + Bebida — $12', icon: <GamepadIcon size={14} /> },
    { text: 'Burgers Cyber Smash 2x1 — Dom a Jue', icon: <BurgerIcon size={14} /> },
    { text: 'Happy Hour — Coctelería de Autor', icon: <CocktailIcon size={14} /> },
    { text: '2x1 Cocteles Galácticos — Lun a Jue, 4pm a 7pm', icon: <CocktailIcon size={14} /> },
    { text: 'Cofre Popcorn Chicken 2x1 — $7', icon: <ChickenIcon size={14} /> },
    { text: 'Gamer Pack: 1h Consola + Burger 180g + Bebida — $12', icon: <GamepadIcon size={14} /> },
    { text: 'Burgers Cyber Smash 2x1 — Dom a Jue', icon: <BurgerIcon size={14} /> },
    { text: 'Happy Hour — Coctelería de Autor', icon: <CocktailIcon size={14} /> },
  ];

  return (
    <div className="ticker-container" aria-hidden="true">
      <div className="ticker-track">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-3 text-white text-[12px] font-bold uppercase tracking-widest whitespace-nowrap">
            <span className="text-brand-cyan opacity-80">{item.icon}</span>
            {item.text}
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
            className="mb-12 max-w-175 mx-auto"
          >
            <h2 id="promos-heading" className="section-title text-center">Nuestras Promociones</h2>
            <div className="w-11.5 h-1 rounded-full bg-[#d4004d] mx-auto mt-4" />
            <p className="text-[#b6b6c0] text-[15px] leading-relaxed mt-3 text-center">
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
