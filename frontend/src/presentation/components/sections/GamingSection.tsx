import { useState } from 'react';
import { motion } from 'framer-motion';
import { gamingStations } from '../../../infrastructure/data/initialData';
import type { GamingStation } from '../../../infrastructure/data/initialData';
import { GamepadIcon, BilliardIcon, DiceIcon, CheckIcon, ClockIcon, ZapIcon, TrophyIcon } from '../icons/CustomIcons';

/* ──────────────────────────────────────────────
   UNIFIED GAMING STATION CARD
   ────────────────────────────────────────────── */
function StationCard({ station }: { station: GamingStation }) {
  const [selectedDuration, setSelectedDuration] = useState<'30min' | '1hora'>('30min');

  // Determine icon & theme color based on station type
  const isConsola = station.tipo === 'consola';
  const isPS5 = station.consola === 'PS5';
  const isSwitch = station.consola === 'Switch';
  const isBillar = station.mesa === 'Billar';

  const getStationIcon = () => {
    if (isConsola) return <GamepadIcon size={22} />;
    if (isBillar) return <BilliardIcon size={22} />;
    if (station.mesa === 'Ping Pong') return <TrophyIcon size={22} />;
    return <DiceIcon size={22} />;
  };

  const getCategoryBadge = () => {
    if (isPS5) return { label: 'PS5 NEXT-GEN', color: 'text-brand-cyan border-brand-cyan/30 bg-brand-cyan/10' };
    if (isSwitch) return { label: 'NINTENDO SYSTEM', color: 'text-brand-purple-light border-brand-purple/30 bg-brand-purple/10' };
    if (isBillar) return { label: 'BILLAR PROFESIONAL', color: 'text-brand-pink border-brand-pink/30 bg-brand-pink/10' };
    if (station.mesa === 'Ping Pong') return { label: 'TENIS DE MESA', color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' };
    return { label: 'JUEGO DE ESTRATEGIA', color: 'text-amber-400 border-amber-500/30 bg-amber-500/10' };
  };

  // Specific items / equipment for salon games
  const getFeatureList = () => {
    if (station.juegos && station.juegos.length > 0) return station.juegos;
    if (isBillar) return ['Paño Profesional', 'Tacos de Madera', 'Bolas Reglamentarias', 'Tiza y Triángulo'];
    if (station.mesa === 'Jenga') return ['Madera Maciza', 'Escala Gigante XXL', 'Juego en Grupo', 'Estrategia y Tensión'];
    if (station.mesa === 'Ping Pong') return ['Mesa Reglamentaria', 'Paletas Pro', 'Pelotas Incluidas', 'Partidas Rápidas'];
    return ['Equipamiento Completo', 'Área Lounge'];
  };

  const badge = getCategoryBadge();
  const currentPrice = selectedDuration === '30min' ? 3.00 : 6.00;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <article
        className="glass-card h-full p-6 flex flex-col justify-between rounded-2xl border border-white/[0.07] hover:border-white/[0.15] bg-[#0c040a]/70 backdrop-blur-xl transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.5)] group relative overflow-hidden"
        aria-label={station.nombre}
      >
        {/* Ambient card accent light */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-white/[0.02] rounded-full blur-2xl group-hover:bg-brand-cyan/[0.04] transition-all" />

        {/* Top: Header & Badges */}
        <div>
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-white group-hover:scale-105 group-hover:border-brand-cyan/40 transition-all flex-shrink-0">
                {getStationIcon()}
              </div>
              <div>
                <span className={`inline-block px-2.5 py-0.5 rounded-md text-[9px] font-black tracking-widest uppercase border ${badge.color} mb-1`}>
                  {badge.label}
                </span>
                <h3 className="text-[19px] font-black text-white leading-tight">
                  {station.nombre}
                </h3>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-[13px] text-white/70 leading-relaxed mb-5 font-normal min-h-[40px]">
            {station.descripcion}
          </p>

          {/* Features / Games Tags */}
          <div className="mb-6">
            <div className="text-[10px] font-bold tracking-[0.2em] text-brand-gray uppercase mb-2.5">
              {isConsola ? 'Experiencia & Configuración' : 'Equipamiento & Dinámica'}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {getFeatureList().map((item) => (
                <span
                  key={item}
                  className="px-2.5 py-1 bg-white/[0.03] border border-white/[0.06] rounded-lg text-[11px] text-white/80 font-medium group-hover:border-white/10 transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom: Pricing & Access Mode */}
        <div className="pt-4 border-t border-white/[0.07] mt-auto">
          {/* Duration Selector Tabs */}
          <div className="mb-3">
            <div className="flex items-center justify-between text-[11px] text-brand-gray font-semibold mb-1.5">
              <span>Tarifa por tiempo</span>
              <span className="text-white/60">Selecciona duración</span>
            </div>
            <div className="grid grid-cols-2 gap-2 bg-black/40 p-1 rounded-xl border border-white/[0.05]">
              <button
                type="button"
                onClick={() => setSelectedDuration('30min')}
                className={`py-2 px-3 rounded-lg text-[12px] font-bold tracking-wide transition-all ${
                  selectedDuration === '30min'
                    ? 'bg-brand-cyan/20 border border-brand-cyan/40 text-brand-cyan shadow-[0_0_10px_rgba(0,229,255,0.15)]'
                    : 'text-brand-gray hover:text-white hover:bg-white/[0.03]'
                }`}
              >
                30 Minutos · $3.00
              </button>
              <button
                type="button"
                onClick={() => setSelectedDuration('1hora')}
                className={`py-2 px-3 rounded-lg text-[12px] font-bold tracking-wide transition-all ${
                  selectedDuration === '1hora'
                    ? 'bg-brand-cyan/20 border border-brand-cyan/40 text-brand-cyan shadow-[0_0_10px_rgba(0,229,255,0.15)]'
                    : 'text-brand-gray hover:text-white hover:bg-white/[0.03]'
                }`}
              >
                1 Hora · $6.00
              </button>
            </div>
          </div>

          {/* Station Equipment / Spec Info Banner */}
          <div className="mb-3.5 flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white/80">
            <CheckIcon size={14} className="text-brand-cyan flex-shrink-0" />
            <span className="text-[11px] font-semibold text-white/90">
              {isConsola ? 'Controles DualSense / Joy-Cons y catálogo incluidos' : 'Equipamiento profesional completo incluido'}
            </span>
          </div>

          {/* Price Display & Cash-Register Notice */}
          <div className="flex items-center justify-between pt-1">
            <div>
              <div className="text-[26px] font-black text-white leading-none">
                ${currentPrice.toFixed(2)}
              </div>
              <div className="text-[10px] text-brand-gray mt-1 flex items-center gap-1">
                <ClockIcon size={11} />
                <span>por {selectedDuration === '30min' ? '30 minutos' : '1 hora de juego'}</span>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-cyan/90 bg-brand-cyan/10 px-3 py-1.5 rounded-lg border border-brand-cyan/20">
                <ZapIcon size={12} />
                Paga en Caja
              </span>
            </div>
          </div>
        </div>
      </article>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   GAMING SECTION
   ────────────────────────────────────────────── */
export function GamingSection() {
  const [filter, setFilter] = useState<'todos' | 'consolas' | 'mesas'>('todos');

  const filteredStations = gamingStations.filter((station) => {
    if (filter === 'consolas') return station.tipo === 'consola';
    if (filter === 'mesas') return station.tipo === 'mesa';
    return true;
  });

  return (
    <section id="gaming" className="relative py-24" aria-labelledby="gaming-heading">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] rounded-full bg-[#800028]/12 blur-[140px] -z-10" aria-hidden="true" />
      <div className="absolute bottom-0 left-[-5%] w-[500px] h-[500px] rounded-full bg-brand-cyan/[0.05] blur-[130px] -z-10" aria-hidden="true" />

      <div className="container-site">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="section-label text-brand-cyan">Zona Gaming & Entretenimiento</div>
          <h2 id="gaming-heading" className="section-title text-white mt-2">
            <span className="section-title-deco">Consolas Next-Gen & Juegos de Salón</span>
          </h2>
          <p className="text-white/75 text-[1.05rem] leading-relaxed max-w-[620px] mt-4 font-normal">
            Tarifa única, transparente y uniforme en todas las experiencias de juego: <strong className="text-white font-bold">$3.00 (30 minutos)</strong> y <strong className="text-white font-bold">$6.00 (1 hora)</strong> para consolas PS5, Nintendo Switch, mesa de billar, jenga gigante y tenis de mesa. Todo se adquiere directamente en caja al llegar.
          </p>
        </motion.div>

        {/* Pricing & Benefits Ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10"
          aria-label="Precios y beneficios"
        >
          <div className="glass-card p-4 rounded-xl border border-white/[0.06] bg-[#12050e]/60 text-center">
            <div className="text-[10px] font-black tracking-[0.2em] text-brand-gray uppercase mb-1">30 Minutos</div>
            <div className="text-[24px] font-black text-brand-cyan leading-tight">$3.00</div>
            <div className="text-[11px] text-brand-gray mt-0.5">Consolas & Mesas</div>
          </div>

          <div className="glass-card p-4 rounded-xl border border-white/[0.06] bg-[#12050e]/60 text-center">
            <div className="text-[10px] font-black tracking-[0.2em] text-brand-gray uppercase mb-1">1 Hora</div>
            <div className="text-[24px] font-black text-brand-cyan leading-tight">$6.00</div>
            <div className="text-[11px] text-brand-gray mt-0.5">Consolas & Mesas</div>
          </div>

          <div className="glass-card p-4 rounded-xl border border-brand-purple/20 bg-brand-purple/10 text-center">
            <div className="text-[10px] font-black tracking-[0.2em] text-brand-purple-light uppercase mb-1">Tarifa Única</div>
            <div className="text-[24px] font-black text-brand-purple-light leading-tight">Universal</div>
            <div className="text-[11px] text-white/70 mt-0.5">Mismo precio para todo</div>
          </div>

          <div className="glass-card p-4 rounded-xl border border-white/[0.06] bg-[#12050e]/60 text-center">
            <div className="text-[10px] font-black tracking-[0.2em] text-brand-pink uppercase mb-1">Sin Reservas</div>
            <div className="text-[24px] font-black text-white leading-tight">En Caja</div>
            <div className="text-[11px] text-brand-gray mt-0.5">Llegas y juegas directo</div>
          </div>
        </motion.div>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            {[
              { id: 'todos', label: 'Todas las Estaciones (5)' },
              { id: 'consolas', label: 'Consolas PS5 & Switch' },
              { id: 'mesas', label: 'Juegos de Salón' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as typeof filter)}
                className={`px-4 py-2 rounded-lg text-[13px] font-bold transition-all ${
                  filter === tab.id
                    ? 'bg-brand-pink text-white shadow-[0_0_15px_rgba(255,0,92,0.4)]'
                    : 'text-brand-gray hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="text-[12px] text-brand-gray font-medium">
            Mostrando <span className="text-white font-bold">{filteredStations.length}</span> experiencias de juego
          </div>
        </div>

        {/* Stations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStations.map((station) => (
            <StationCard key={station.id} station={station} />
          ))}
        </div>
      </div>
    </section>
  );
}
