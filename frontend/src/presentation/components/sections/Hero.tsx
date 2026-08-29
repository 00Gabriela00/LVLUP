import Spline from '@splinetool/react-spline';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { zones } from '../shared/zones';

export function Hero() {
  const [activeZone, setActiveZone] = useState<string | null>(null);

  return (
    <header className="container mx-auto px-6 py-20 md:py-28 grid md:grid-cols-[1.1fr_0.9fr] gap-16 items-center relative z-10 font-sans">
      {/* Left: Text content */}
      <div>
        <div className="text-brand-pink font-bold text-[13px] tracking-[3px] mb-5">
          BAR & GAME CENTER
        </div>
        
        <h1 className="text-[72px] font-black italic leading-[0.98] m-0 drop-shadow-[0_0_22px_rgba(245,245,247,0.25)] text-white">
          LVL UP
        </h1>
        <h1 className="text-[72px] font-black italic leading-[0.98] m-0 text-brand-cyan drop-shadow-[0_0_26px_rgba(0,229,255,0.2)]">
          YOUR NIGHT
        </h1>
        
        <p className="text-brand-gray text-[17px] max-w-115 mt-6 leading-[1.7]">
          Tres zonas, una sola noche: arcade y consolas next-gen, bowling & mesas de pool, y karaoke privado — con coctelería temática en cada rincón.
        </p>
        
        <div className="flex gap-3 mt-9">
          <button className="bg-brand-pink text-white border-none rounded-full px-8 py-4 font-bold text-[15px] cursor-pointer flex items-center gap-2 hover:bg-pink-600 transition-colors">
            RESERVAR <ArrowRight size={15} />
          </button>
          <button className="bg-transparent text-brand-cyan border border-brand-cyan rounded-full px-8 py-4 font-bold text-[15px] cursor-pointer hover:bg-brand-cyan/10 transition-colors">
            VER MENÚ
          </button>
        </div>

        {/* Zone badges */}
        <div className="flex flex-wrap gap-3 mt-10">
          {zones.map((zone) => {
            const Icon = zone.icon;
            const isActive = activeZone === zone.key;
            return (
              <button
                key={zone.key}
                onClick={() => setActiveZone(isActive ? null : zone.key)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full border text-[14px] font-semibold tracking-[0.2px] cursor-pointer transition-all duration-200
                  ${isActive 
                    ? `${zone.border} ${zone.dim} ${zone.color}`
                    : 'border-white/10 text-brand-gray bg-transparent hover:border-white/20'
                  }`}
              >
                <Icon size={15} />
                {zone.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Right: 3D Spline scene - NO TOCADO */}
      <div className="relative flex justify-center items-center h-87.5 md:h-125">
        {/* Pink glow circle background */}
        <div className="absolute w-75 h-75 bg-brand-pink rounded-full -z-10 shadow-[0_0_50px_rgba(255,0,92,0.5)]"></div>

        <div className="relative z-10 w-full h-full overflow-hidden" style={{ clipPath: 'inset(0 0 50px 0)' }}>
          <Spline
            className="w-full h-full"
            scene="https://prod.spline.design/zlJegUJARWOdVadW/scene.splinecode"
          />
        </div>
      </div>

      <style>{`
        spline-viewer::part(logo) {
          display: none !important;
        }
        spline-viewer::part(container) {
          border: none !important;
          outline: none !important;
        }
        canvas {
          pointer-events: none;
          border: none !important;
          outline: none !important;
        }
      `}</style>
    </header>
  );
}
