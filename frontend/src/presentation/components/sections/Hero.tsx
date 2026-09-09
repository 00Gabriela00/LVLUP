import { motion } from 'framer-motion';
import { ChevronDownIcon } from '../icons/CustomIcons';
import heroImg from '../../../assets/hero_img.png';

/* ──────────────────────────────────────────────
   HERO SECTION — Ultra-Premium Dark Crimson Cyberpunk Layout
   ────────────────────────────────────────────── */
export function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-[90vh] sm:min-h-[94vh] flex flex-col justify-center overflow-hidden pt-24 pb-12 sm:pt-32 sm:pb-16"
      aria-labelledby="hero-heading"
    >
      {/* Background Atmosphere: Círculos sutiles de baja opacidad */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none max-w-full" aria-hidden="true">
        {/* Círculo 1: Púrpura sutil */}
        <div className="absolute top-[5%] left-[5%] sm:left-[15%] w-72 sm:w-200 h-72 sm:h-137.5 rounded-full bg-[rgba(40,20,70,0.55)] blur-[90px] sm:blur-[120px]" />
        
        {/* Círculo 2: Cian / Teal sutil */}
        <div className="absolute top-[35%] right-[-10%] sm:right-[-5%] w-64 sm:w-175 h-64 sm:h-125 rounded-full bg-[rgba(10,60,70,0.45)] blur-[90px] sm:blur-[120px]" />

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
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-10 lg:gap-10 xl:gap-12 items-center pt-10 lg:pt-0">
          {/* ── Left Column: Main Headline & Info (Expanded nicely to the right) ── */}
          <motion.div
            className="lg:col-span-7 xl:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Main Heading */}
            <h1 id="hero-heading" className="mb-5 sm:mb-6 tracking-tight max-w-2xl mx-auto lg:mx-0">
              <span
                className="block text-[clamp(2.7rem,5.8vw,5.8rem)] font-black italic tracking-tight leading-[0.92] text-white drop-shadow-[0_4px_30px_rgba(255,255,255,0.15)]"
                style={{ fontFamily: "'Chakra Petch', sans-serif" }}
              >
                LVL UP
              </span>
              <span
                className="block text-[clamp(2.7rem,5.8vw,5.8rem)] font-black italic tracking-tight leading-[0.92] text-brand-cyan"
                style={{
                  fontFamily: "'Chakra Petch', sans-serif",
                  textShadow: '0 0 8px #00E5FF, 0 0 20px #00E5FF, 0 0 40px #00E5FF',
                }}
              >
                YOUR NIGHT
              </span>
            </h1>

            {/* High Impact Copy Alien / Cyber-Lounge */}
            <p className="text-sm sm:text-base lg:text-[17px] text-gray-200 leading-relaxed sm:leading-[1.75] max-w-xl font-normal mb-6 sm:mb-9 mx-auto lg:mx-0">
              Traspasa la atmósfera convencional.{' '}
              <strong className="text-white font-bold">Coctelería de autor galáctica</strong>,{' '}
              gastronomía interestelar de alto nivel,{' '}
              <strong className="text-cyan-300 font-bold">consolas Next-Gen</strong> y mesas de juego en una experiencia inmersiva de otro planeta.
            </p>

            {/* Cyberpunk Glitch Action Buttons CTAs (Fiel a uiverse.io con fondos sólidos y sin espacios raros) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-4 sm:gap-5 w-full sm:w-auto pt-1">
              {/* Button 1: Explorar Menú Galáctico (Crimson Red / Yellow Shadow) */}
              <div className="cyber-btn-wrapper">
                <a
                  href="#menu"
                  className="cyber-btn cyber-btn--crimson group"
                  aria-label="Explorar Menú Galáctico"
                >
                  <span className="btn-text">
                    EXPLORAR MENÚ GALÁCTICO <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
                  </span>
                  <span className="cyber-btn__glitch" aria-hidden="true">
                    MENÚ GALÁCTICO ⚡
                  </span>
                </a>
              </div>

              {/* Button 2: Zona Gaming & Tarifas (Electric Purple / Green Shadow) */}
              <div className="cyber-btn-wrapper">
                <a
                  href="#gaming"
                  className="cyber-btn cyber-btn--purple group"
                  aria-label="Zona Gaming y Tarifas"
                >
                  <span className="btn-text">
                    ZONA GAMING & TARIFAS
                  </span>
                  <span className="cyber-btn__glitch" aria-hidden="true">
                    ZONA GAMING 🎮
                  </span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* ── Right Column: Hero Image ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 xl:col-span-5 relative mt-6 lg:mt-0 flex items-center justify-center"
          >
            {/* Ambient glow behind image */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none -z-10"
              style={{
                background: 'radial-gradient(circle at center, rgba(0, 229, 255, 0.15) 0%, rgba(14, 165, 233, 0.08) 40%, transparent 70%)',
                filter: 'blur(60px)',
                transform: 'scale(1.2)',
              }}
              aria-hidden="true"
            />
            <img
              src={heroImg}
              alt="PS5 con coctelería y gaming — LVL UP Game Bar"
              className="w-full max-w-md lg:max-w-none select-none"
              style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.6)) drop-shadow(0 0 30px rgba(0,229,255,0.15))' }}
              draggable={false}
              fetchPriority="high"
              decoding="async"
            />
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
