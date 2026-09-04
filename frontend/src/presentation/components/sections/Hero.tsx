import { motion } from 'framer-motion';
import { ChevronDownIcon, GamepadIcon, CocktailIcon, BurgerIcon, ZapIcon } from '../icons/CustomIcons';

/* ──────────────────────────────────────────────
   HERO SECTION — Ultra-Premium Dark Crimson Cyberpunk Layout
   ────────────────────────────────────────────── */
export function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-[94vh] flex flex-col justify-center overflow-hidden pt-28 pb-16"
      aria-labelledby="hero-heading"
    >
      {/* Background Atmosphere: Círculos sutiles de baja opacidad (Púrpura at 30% 20% & Cian at 85% 70%) */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Círculo 1: Púrpura sutil de baja opacidad (arriba a la izquierda 30% 20%) */}
        <div className="absolute top-[10%] left-[15%] w-200 h-137.5 rounded-full bg-[rgba(40,20,70,0.55)] blur-[120px]" />
        
        {/* Círculo 2: Cian / Teal sutil de baja opacidad (abajo a la derecha 85% 70%) */}
        <div className="absolute top-[40%] right-[-5%] w-175 h-125 rounded-full bg-[rgba(10,60,70,0.45)] blur-[120px]" />

        {/* Subtle Cyber Grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(127,92,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.3) 1px, transparent 1px)`,
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <div className="container-site">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* ── Left Column: Main Headline & Info (7 cols) ── */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Main Heading */}
            <h1 id="hero-heading" className="mb-6 tracking-tight">
              <span className="block text-[clamp(3.8rem,8.5vw,6.5rem)] font-black italic leading-[0.92] text-white drop-shadow-[0_4px_30px_rgba(255,255,255,0.12)]">
                LVL UP
              </span>
              <span className="block text-[clamp(3.8rem,8.5vw,6.5rem)] font-black italic leading-[0.92] text-brand-cyan text-glow-cyan">
                YOUR NIGHT
              </span>
            </h1>

            {/* High Impact Copy Alien / Cyber-Lounge */}
            <p className="text-[clamp(1.05rem,1.8vw,1.25rem)] text-white/85 leading-[1.75] max-w-140 font-normal mb-9">
              Traspasa la atmósfera convencional. <strong className="text-white font-semibold">Coctelería de autor galáctica</strong>, gastronomía interestelar de alto nivel, <strong className="text-white font-semibold">consolas Next-Gen</strong> y mesas de juego en una experiencia inmersiva de otro planeta.
            </p>

            {/* Action Buttons CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#menu"
                className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-[#03151e]/80 hover:bg-[#062433] border border-brand-cyan/50 hover:border-brand-cyan text-brand-cyan hover:text-white font-bold text-[14px] tracking-wider uppercase transition-all duration-300 shadow-[0_0_20px_rgba(0,229,255,0.2)] hover:shadow-[0_0_30px_rgba(0,229,255,0.4)]"
              >
                <span className="relative z-10">Explorar Menú Galáctico</span>
                <span className="relative z-10 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
              </a>

              <a
                href="#gaming"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-white/3 hover:bg-white/7 border border-white/10 hover:border-brand-pink/50 text-white font-semibold text-[14px] tracking-wider uppercase transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_rgba(255,0,92,0.2)]"
              >
                <span>Zona Gaming & Tarifas</span>
              </a>
            </div>
          </motion.div>

          {/* ── Right Column: Interactive LVLUP Showcase Feature Cards (5 cols) ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative"
          >
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-linear-to-tr from-[#800028]/30 via-brand-cyan/15 to-[#b50035]/25 rounded-3xl blur-3xl -z-10" />

            <div className="relative rounded-3xl border border-white/10 bg-linear-to-b from-[#160611]/90 via-[#0d030a]/90 to-[#070105]/95 backdrop-blur-2xl p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_40px_rgba(128,0,40,0.25)] space-y-4">
              {/* Header Status Bar */}
              <div className="flex items-center justify-between border-b border-white/8 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-linear-to-br from-brand-cyan to-brand-pink text-slate-950 font-black text-sm flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.4)]">
                    LVL
                  </div>
                  <div>
                    <div className="text-xs font-black text-white leading-tight">LVLUP GAME BAR</div>
                    <div className="text-[10px] text-brand-cyan font-bold tracking-wider">EXPERIENCIA INMERSIVA</div>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-brand-pink/15 text-brand-pink border border-brand-pink/30 shadow-[0_0_12px_rgba(255,0,92,0.2)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-pink animate-pulse" />
                  Nivel Superior
                </span>
              </div>

              {/* 3 Interactive Highlight Pillars */}
              <div className="space-y-3 pt-1">
                {/* 1. Gaming */}
                <div className="p-3.5 rounded-2xl bg-white/3 hover:bg-white/6 border border-white/6 hover:border-brand-cyan/40 transition-all duration-300 flex items-center gap-3.5 group">
                  <div className="w-11 h-11 rounded-xl bg-brand-cyan/15 text-brand-cyan flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(0,229,255,0.15)]">
                    <GamepadIcon size={22} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-black text-white group-hover:text-brand-cyan transition-colors">
                      Arena Gaming Next-Gen
                    </div>
                    <div className="text-[11px] text-white/60 truncate">
                      PlayStation 5 en 4K HDR · Nintendo Switch Lounge · Billar & Jenga XXL
                    </div>
                  </div>
                </div>

                {/* 2. Cocktails */}
                <div className="p-3.5 rounded-2xl bg-white/3 hover:bg-white/6 border border-white/6 hover:border-brand-pink/40 transition-all duration-300 flex items-center gap-3.5 group">
                  <div className="w-11 h-11 rounded-xl bg-brand-pink/15 text-brand-pink flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(255,0,92,0.15)]">
                    <CocktailIcon size={22} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-black text-white group-hover:text-brand-pink transition-colors">
                      Coctelería de Autor Galáctica
                    </div>
                    <div className="text-[11px] text-white/60 truncate">
                      Supernova, Luna & Marte · Happy Hours 2x1 · Licores de barra
                    </div>
                  </div>
                </div>

                {/* 3. Food */}
                <div className="p-3.5 rounded-2xl bg-white/3 hover:bg-white/6 border border-white/6 hover:border-amber-400/40 transition-all duration-300 flex items-center gap-3.5 group">
                  <div className="w-11 h-11 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(245,158,11,0.15)]">
                    <BurgerIcon size={22} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-black text-white group-hover:text-amber-400 transition-colors">
                      Gastronomía Interestelar
                    </div>
                    <div className="text-[11px] text-white/60 truncate">
                      Burgers 180g Angus · Rolls de Sushi Flameados · Naves de Cotufas
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Feature Badge */}
              <div className="pt-3 border-t border-white/6 flex items-center justify-between text-[11px]">
                <span className="text-white/60 font-medium">Valencia, Venezuela</span>
                <span className="text-brand-cyan font-bold flex items-center gap-1">
                  <ZapIcon size={12} />
                  Ambiente Gastro-Lounge
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-col items-center gap-2 mt-16 pb-2"
          aria-label="Desplazarse hacia abajo"
        >
          <span className="text-[10px] font-semibold tracking-[0.3em] text-brand-gray uppercase">Explorar</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDownIcon size={18} className="text-brand-gray" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
