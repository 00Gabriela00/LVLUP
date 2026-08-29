import { useState } from 'react';
import { Users, Check } from 'lucide-react';
import { zones } from '../shared/zones';

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 items-start text-[14px] text-gray-300 mb-4 leading-relaxed">
      <Check size={16} className="mt-0.5 shrink-0 text-green-400" />
      <span>{children}</span>
    </li>
  );
}

function DurationToggle({ zone, duration, setDuration }: { zone: typeof zones[number], duration: string, setDuration: (d: string) => void }) {
  return (
    <div className="flex gap-2 mb-4">
      {['2 horas', '3 horas'].map((d) => {
        const isActive = duration === d;
        return (
          <button
            key={d}
            onClick={() => setDuration(d)}
            className={`flex-1 py-2 rounded-lg border text-[12px] font-bold cursor-pointer transition-colors
              ${isActive 
                ? `${zone.border} ${zone.dim} ${zone.color}` 
                : 'border-white/10 text-brand-gray bg-transparent hover:border-white/20'
              }`}
          >
            {d}
          </button>
        );
      })}
    </div>
  );
}

export function PricingPlans() {
  const [arcadeDuration, setArcadeDuration] = useState('2 horas');
  const [bowlingDuration, setBowlingDuration] = useState('2 horas');
  const [karDuration, setKarDuration] = useState('2 horas');
  const [karTier, setKarTier] = useState('Estándar');

  const arcadePrices: Record<string, number> = { '2 horas': 40, '3 horas': 55 };
  const bowlingPrices: Record<string, number> = { '2 horas': 60, '3 horas': 80 };
  const karTiers: Record<string, { extra: string; prices: Record<string, number> }> = {
    'Estándar': {
      extra: 'Sala compartida, pantalla y micrófonos',
      prices: { '2 horas': 50, '3 horas': 70 },
    },
    'VIP Insonorizada': {
      extra: 'Sala privada insonorizada, luces, catálogo ampliado',
      prices: { '2 horas': 90, '3 horas': 120 },
    },
  };

  const renderZoneCard = (zone: typeof zones[number], price: number, duration: string, capacity: string, children: React.ReactNode) => {
    const Icon = zone.icon;
    return (
      <div className={`bg-brand-dark/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col border-t-[3px] ${zone.border} shadow-lg transition-transform hover:-translate-y-1`}>
        <div className="flex items-center gap-3 mb-2">
          <div className={`w-10 h-10 rounded-lg ${zone.dim} flex items-center justify-center ${zone.color}`}>
            <Icon size={18} />
          </div>
          <span className={`${zone.color} font-bold text-[14px] tracking-widest uppercase`}>
            {zone.label}
          </span>
        </div>

        <div className="flex items-baseline gap-2 my-5">
          <span className="text-[38px] font-black text-white leading-none">${price}</span>
          <span className="text-brand-gray text-[13px]">/ paquete de {duration}</span>
        </div>

        {capacity && (
          <div className="flex items-center gap-2 text-brand-gray text-[13px] mb-4">
            <Users size={14} /> {capacity}
          </div>
        )}

        <div className="grow">
          {children}
        </div>

        <div className="border-t border-white/10 my-5"></div>

        <button
          className={`w-full bg-transparent border border-white/20 text-white rounded-xl py-3.5 font-extrabold text-[14px] tracking-wide cursor-pointer mt-6 transition-colors hover:text-black hover:border-transparent`}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = zone.color.replace('text-', 'var(--');
            e.currentTarget.style.color = '#000';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = 'white';
          }}
        >
          RESERVAR ZONA
        </button>
      </div>
    );
  };

  return (
    <section id="planes" className="relative py-24 font-sans">
      <div className="absolute top-0 right-[-10%] w-150 h-150 bg-brand-purple rounded-full blur-[100px] opacity-10 -z-10 pointer-events-none"></div>

      <div className="max-w-300 mx-auto px-6">
        <div className="text-brand-pink font-bold text-[13px] tracking-[3px] mb-3">
          PLANES DE RESERVACIÓN
        </div>
        <h2 className="italic font-black text-[40px] m-0 mb-12 drop-shadow-md">
          RESERVA TU ZONA
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Zona 1: Arcade */}
          {renderZoneCard(zones[0], arcadePrices[arcadeDuration], arcadeDuration, 'Hasta 15 personas aprox.', (
            <>
              <DurationToggle zone={zones[0]} duration={arcadeDuration} setDuration={setArcadeDuration} />
              <ul className="list-none p-0 m-0">
                <CheckItem>Consolas PS5 y Nintendo Switch (varios puestos)</CheckItem>
                <CheckItem>Acceso a sala arcade general</CheckItem>
                <CheckItem>Ronda de bebidas temáticas de bienvenida para el grupo</CheckItem>
              </ul>
            </>
          ))}

          {/* Zona 2: Bowling & Pool */}
          {renderZoneCard(zones[1], bowlingPrices[bowlingDuration], bowlingDuration, 'Hasta 15 personas aprox.', (
            <>
              <DurationToggle zone={zones[1]} duration={bowlingDuration} setDuration={setBowlingDuration} />
              <ul className="list-none p-0 m-0">
                <CheckItem>Acceso conjunto a bowling, mesa de pool y ping-pong</CheckItem>
                <CheckItem>Zona reservada en exclusiva para el grupo</CheckItem>
                <CheckItem>Ronda de cócteles temáticos para el grupo</CheckItem>
              </ul>
            </>
          ))}

          {/* Zona 3: Karaoke */}
          {renderZoneCard(zones[2], karTiers[karTier].prices[karDuration], karDuration, 'Hasta 15 personas aprox.', (
            <>
              <DurationToggle zone={zones[2]} duration={karDuration} setDuration={setKarDuration} />
              <div className="flex gap-2 mb-4">
                {Object.keys(karTiers).map((t) => (
                  <button
                    key={t}
                    onClick={() => setKarTier(t)}
                    className={`flex-1 py-2 rounded-lg border text-[12px] font-bold cursor-pointer transition-colors
                      ${karTier === t 
                        ? 'border-brand-pink bg-brand-pink/20 text-brand-pink' 
                        : 'border-white/10 text-brand-gray bg-transparent hover:border-white/20'
                      }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <ul className="list-none p-0 m-0">
                <CheckItem>{karTiers[karTier].extra}</CheckItem>
                <CheckItem>Catálogo de canciones + juegos de mesa</CheckItem>
                <CheckItem>Ronda de bebidas + snack pack para el grupo</CheckItem>
              </ul>
            </>
          ))}
        </div>
      </div>
    </section>
  );
}
