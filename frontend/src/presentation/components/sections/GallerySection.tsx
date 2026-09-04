import { motion } from 'framer-motion';
import { CocktailIcon, BurgerIcon, GamepadIcon, BilliardIcon, ZapIcon } from '../icons/CustomIcons';

/* ──────────────────────────────────────────────
   EXPERIENCE SHOWCASE SECTION
   4 Pilares visuales de la experiencia LVLUP
   ────────────────────────────────────────────── */

interface ExperiencePillar {
  id: string;
  badge: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  color: 'cyan' | 'pink' | 'purple' | 'amber';
  Icon: React.FC<{ size?: number; className?: string }>;
  href: string;
  linkText: string;
}

const PILLARS: ExperiencePillar[] = [
  {
    id: 'cocteleria',
    badge: 'BARRA GALÁCTICA',
    title: 'Mixología de Autor',
    tagline: 'Cocteles de otro planeta',
    description: 'Recetas exclusivas preparadas por bartenders profesionales, con efectos visuales, ingredientes premium y presentaciones únicas.',
    features: ['Cocteles Signature (Supernova, Luna)', 'Happy Hours 2x1 Lunes a Jueves', 'Servicios de Licores & Shots'],
    color: 'pink',
    Icon: CocktailIcon,
    href: '#menu',
    linkText: 'Ver Cocteles',
  },
  {
    id: 'gastronomia',
    badge: 'GASTRO-LOUNGE',
    title: 'Cocina Interestelar',
    tagline: 'Sabor 100% artesanal',
    description: 'Hamburguesas contundentes de 180g Angus, rolls de sushi frescos y flameados, y naves de cotufas de pollo para compartir con amigos.',
    features: ['Burgers Artesanales & Papas Rústicas', 'Sushi & Rolls Dinamita Flameados', 'Naves de Cotufas 2x1'],
    color: 'amber',
    Icon: BurgerIcon,
    href: '#menu',
    linkText: 'Explorar Menú',
  },
  {
    id: 'gaming-nextgen',
    badge: 'CONSOLAS NEXT-GEN',
    title: 'Arena PlayStation 5 & Switch',
    tagline: 'Gráficos 4K a 120 FPS',
    description: 'Estaciones de juego individuales y lounges para 4 jugadores equipados con mandos DualSense hápticos, audio espacial y los mejores títulos.',
    features: ['Tarifas desde $3 (30 min) / $6 (1 hora)', 'Multijugador local & party games', 'Mandos y pantallas profesionales'],
    color: 'cyan',
    Icon: GamepadIcon,
    href: '#gaming',
    linkText: 'Ver Tarifas Gaming',
  },
  {
    id: 'juegos-salon',
    badge: 'SALÓN SOCIAL',
    title: 'Billar Reglamentario & Jenga XXL',
    tagline: 'Diversión para grupos',
    description: 'El ambiente ideal para relajarse entre tragos. Mesas profesionales de billar, tenis de mesa y la emocionante torre de Jenga Gigante.',
    features: ['Paño de billar de alta velocidad', 'Torre Jenga Gigante en madera maciza', 'Mesa de Ping Pong con paletas'],
    color: 'purple',
    Icon: BilliardIcon,
    href: '#gaming',
    linkText: 'Ver Juegos de Salón',
  },
];

export function GallerySection() {
  return (
    <section id="galeria" className="relative py-24 overflow-hidden" aria-labelledby="experiencias-heading">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-125 rounded-full bg-brand-purple/4 blur-[140px] -z-10 pointer-events-none" aria-hidden="true" />

      <div className="container-site">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center max-w-2xl mx-auto"
        >
          <h2 id="experiencias-heading" className="section-title text-white mt-2">
            <span className="section-title-deco">Dimensiones de la Experiencia</span>
          </h2>
          <p className="text-white/75 text-[1.05rem] leading-relaxed mt-4">
            Cuatro pilares diseñados para elevar tus salidas nocturnas: coctelería de autor, cocina de nivel, videojuegos Next-Gen y juegos de salón.
          </p>
        </motion.div>

        {/* 4-Pillars Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {PILLARS.map((pillar, i) => {
            const IconComp = pillar.Icon;

            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-3xl bg-[#0e040c]/85 border border-white/8 hover:border-white/18 p-7 flex flex-col justify-between shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-300 group hover:-translate-y-1"
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-white/4 text-white/80 border border-white/8">
                      {pillar.badge}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-white/3 border border-white/8 flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(0,0,0,0.4)]">
                      <IconComp size={24} />
                    </div>
                  </div>

                  {/* Titles */}
                  <h3 className="text-[22px] font-black text-white leading-tight mb-1 group-hover:text-brand-cyan transition-colors">
                    {pillar.title}
                  </h3>
                  <div className="text-[12px] font-semibold text-brand-cyan mb-3">
                    {pillar.tagline}
                  </div>

                  {/* Description */}
                  <p className="text-[13px] text-white/70 leading-relaxed mb-5">
                    {pillar.description}
                  </p>

                  {/* Feature Bullets */}
                  <div className="space-y-2 mb-6">
                    {pillar.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2 text-[12px] text-white/85 font-medium">
                        <ZapIcon size={12} className="text-brand-cyan shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Action */}
                <div className="pt-4 border-t border-white/6 flex items-center justify-between">
                  <a
                    href={pillar.href}
                    className="inline-flex items-center gap-2 text-[13px] font-bold text-white group-hover:text-brand-cyan transition-colors"
                  >
                    <span>{pillar.linkText}</span>
                    <span className="group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
