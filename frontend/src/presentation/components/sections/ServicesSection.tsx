import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { GamepadIcon, BurgerIcon, BilliardIcon } from '../icons/CustomIcons';

const SERVICES = [
  {
    key: 'gaming',
    icon: GamepadIcon,
    label: 'Gaming Zone',
    color: 'text-brand-cyan',
    border: 'border-brand-cyan/20',
    glow: 'bg-brand-cyan/[0.06]',
    dimBg: 'bg-brand-cyan/10',
    title: 'Zona Gaming',
    desc: 'Consolas next-gen en todo momento. El paraiso del gamer.',
    items: ['PlayStation 5 — $3 / 30 min · $6 / hora', 'Nintendo Switch — $3 / 30 min · $6 / hora', 'Catalogo de mas de 15 titulos premium', 'Gaming chairs y setup full HD'],
  },
  {
    key: 'game-room',
    icon: BilliardIcon,
    label: 'Game Room',
    color: 'text-brand-purple-light',
    border: 'border-brand-purple/20',
    glow: 'bg-brand-purple/[0.06]',
    dimBg: 'bg-brand-purple/10',
    title: 'Sala de Juegos',
    desc: 'El espacio perfecto para el grupo que juega en grande.',
    items: ['Mesa de Billar — $3 / 30 min · $6 / hora', 'Torre Jenga Gigante — $3 / 30 min · $6 / hora', 'Mesa de Ping Pong — $3 / 30 min · $6 / hora', 'Ambiente de competencia y diversion'],
  },
  {
    key: 'food',
    icon: BurgerIcon,
    label: 'Food & Drinks',
    color: 'text-brand-pink',
    border: 'border-brand-pink/20',
    glow: 'bg-brand-pink/[0.06]',
    dimBg: 'bg-brand-pink/10',
    title: 'Gastronomia y Barra',
    desc: 'Sabores de otro mundo para acompañar la mejor noche.',
    items: ['Burgers Gourmet y Platos de la Casa', 'Sushi & Rolls de Fusion Galactica', 'Snacks, Naves de Cotufas y Tequenos', 'Cocteles Galacticos y Servicios Premium'],
  },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export function ServicesSection() {
  return (
    <section id="servicios" className="relative py-24" aria-labelledby="servicios-heading">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-brand-purple/4 blur-[100px] -z-10" aria-hidden="true" />

      <div className="container-site">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <h2 id="servicios-heading" className="section-title text-white mt-2">
            <span className="section-title-deco">Todo en Un Solo Lugar</span>
          </h2>
          <p className="text-brand-gray text-[1rem] leading-relaxed max-w-130 mt-6">
            Tres experiencias de entretenimiento, una sola noche. Disfruta de gaming, juegos de salon y la mejor gastronomia galactica.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          role="list"
        >
          {SERVICES.map((svc) => {
            const Icon = svc.icon;
            const colorHex = svc.key === 'gaming' ? '#22d3ee' : svc.key === 'game-room' ? '#b26bff' : '#ff4d6d';
            
            return (
              <motion.article
                key={svc.key}
                variants={item}
                className="svc flex flex-col"
                style={{ '--c': colorHex } as React.CSSProperties}
                role="listitem"
              >
                {/* Icon + Label */}
                <div className="svc-top">
                  <div className="svc-icon text-white">
                    <Icon size={24} aria-hidden="true" />
                  </div>
                  <div>
                    <div className="svc-eyebrow">{svc.label}</div>
                    <h3 className="text-white">{svc.title}</h3>
                  </div>
                </div>

                {/* Description */}
                <p className="desc text-left">
                  {svc.desc}
                </p>

                {/* Features */}
                <ul className="feat-list mt-auto text-left" aria-label={`Características de ${svc.title}`}>
                  {svc.items.map((it) => (
                    <li key={it}>
                      <span className="check">✓</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={`#${svc.key === 'food' ? 'menu' : 'gaming'}`}
                  className="svc-cta"
                >
                  Ver más <span className="arrow">›</span>
                </a>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
