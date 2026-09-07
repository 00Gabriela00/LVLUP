import React, { useState } from "react";
import { motion } from 'framer-motion';
import { Gamepad2, Dices, UtensilsCrossed, ArrowRight } from "lucide-react";

const SERVICES = [
  {
    id: "gaming",
    ribbon: "ZONA GAMING",
    title: "Zona Gaming",
    description: "Consolas next-gen en todo momento. El paraíso del gamer.",
    icon: Gamepad2,
    color: "#2DD4EE",
    colorSoft: "rgba(45, 212, 238, 0.14)",
    items: [
      { label: "PlayStation 5", price: "$3 / 30 min · $6 / hora" },
      { label: "Nintendo Switch", price: "$3 / 30 min · $6 / hora" },
      { label: "Catálogo de más de 15 títulos premium", price: "" },
      { label: "Gaming chairs y setup Full HD", price: "" },
    ],
    cta: "Ver zona gaming",
  },
  {
    id: "juegos",
    ribbon: "SALA DE JUEGOS",
    title: "Sala de Juegos",
    description: "El espacio perfecto para el grupo que juega en grande.",
    icon: Dices,
    color: "#A855F7",
    colorSoft: "rgba(168, 85, 247, 0.14)",
    items: [
      { label: "Mesa de Billar", price: "$3 / 30 min · $6 / hora" },
      { label: "Torre Jenga Gigante", price: "$3 / 30 min · $6 / hora" },
      { label: "Mesa de Ping Pong", price: "$3 / 30 min · $6 / hora" },
      { label: "Ambiente de competencia y diversión", price: "" },
    ],
    cta: "Ver juegos",
  },
  {
    id: "food",
    ribbon: "FOOD & DRINKS",
    title: "Gastronomía y Barra",
    description: "Sabores de otro mundo para acompañar la mejor noche.",
    icon: UtensilsCrossed,
    color: "#F43F6E",
    colorSoft: "rgba(244, 63, 110, 0.14)",
    items: [
      { label: "Burgers gourmet y platos de la casa", price: "" },
      { label: "Sushi & rolls de fusión galáctica", price: "" },
      { label: "Snacks, naves de cotufas y tequeños", price: "" },
      { label: "Cocteles galácticos y servicios premium", price: "" },
    ],
    cta: "Ver menú completo",
  },
];

function ServiceCard({ service }: { service: typeof SERVICES[0] }) {
  const Icon = service.icon;
  const [hovered, setHovered] = useState(false);
  const lastIndex = service.items.length - 1;

  return (
    <div
      className="loot svc-loot"
      style={{ '--c1': '#13141f', '--c2': service.color } as React.CSSProperties}
    >
      <div className="loot-inner relative flex-1">
        {/* Ribbon diagonal */}
        <div
          style={{
            position: "absolute",
            right: "-46px",
            top: "18px",
            width: "170px",
            transform: "rotate(45deg)",
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          <div
            style={{
              padding: "4px 0",
              textAlign: "center",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.05em",
              background: service.color,
              color: "#05060f",
            }}
          >
            {service.ribbon}
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          {/* Chip de ícono integrado al flujo normal para que no se salga */}
          <div
            className="flex items-center justify-center mb-6"
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "12px",
              background: `linear-gradient(145deg, ${service.color}33, ${service.color}0d)`,
              border: `1px solid ${service.color}66`,
              boxShadow: `0 0 24px ${service.color}55`,
            }}
          >
            <Icon size={26} color={service.color} strokeWidth={2} />
          </div>

          <h3 className="text-xl font-bold text-white">{service.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-400">
            {service.description}
          </p>

          <ul className="mt-5 flex-1 flex flex-col" aria-label={`Características de ${service.title}`}>
            {service.items.map((item, i) => (
              <li
                key={i}
                className="flex items-start justify-between gap-3 text-sm"
                style={{
                  paddingBottom: "12px",
                  marginBottom: i === lastIndex ? 0 : "12px",
                  borderBottom:
                    i === lastIndex
                      ? "none"
                      : "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <span className="flex items-start gap-2 text-gray-200">
                  {/* Círculo de color */}
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: service.color }}
                  />
                  <span>{item.label}</span>
                </span>
                {item.price && (
                  <span
                    className="shrink-0 text-xs font-medium text-right"
                    style={{ color: service.color }}
                  >
                    {item.price}
                  </span>
                )}
              </li>
            ))}
          </ul>

          <a
            href={`#${service.id === 'food' ? 'menu' : 'gaming'}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="mt-6 flex w-full items-center justify-center gap-2 py-2.5 text-sm font-bold uppercase tracking-wide transition-transform hover:scale-105"
            style={{
              background: service.colorSoft,
              color: service.color,
              border: `1px solid ${service.color}55`,
              clipPath:
                "polygon(0 0, 94% 0, 100% 50%, 94% 100%, 0 100%, 0% 50%)",
            }}
          >
            {service.cta}
            <ArrowRight
              size={14}
              style={{
                transform: hovered ? "translateX(4px)" : "translateX(0px)",
                transition: "transform 0.2s ease",
              }}
            />
          </a>
        </div>
      </div>
    </div>
  );
}

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
          <h2 id="servicios-heading" className="section-title mt-2 text-center">
            <span className="section-title-deco">Todo en Un Solo Lugar</span>
          </h2>
          <p className="text-brand-gray text-[1rem] leading-relaxed max-w-130 mx-auto mt-6 text-center">
            Tres experiencias de entretenimiento, una sola noche. Disfruta de gaming, juegos de salón y la mejor gastronomía galáctica.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
