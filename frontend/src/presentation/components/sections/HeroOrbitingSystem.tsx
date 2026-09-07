import { useState, useEffect } from 'react';
import { OrbitingCircles } from '../magicui/orbiting-circles';
import { GamepadIcon, CocktailIcon, BurgerIcon, ZapIcon, LogoIcon } from '../icons/CustomIcons';
import { Trophy, Sparkles, Dices, Headphones, Flame, Swords, Beer, Rocket } from 'lucide-react';

export function HeroOrbitingSystem() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Proportional, spacious radii with ~55-60px gap between rings (Zero overlap across rings)
  const innerRadius = isMobile ? 58 : 85;
  const middleRadius = isMobile ? 100 : 145;
  const outerRadius = isMobile ? 140 : 200;

  const innerIconSize = isMobile ? 28 : 35;
  const middleIconSize = isMobile ? 30 : 37;
  const outerIconSize = isMobile ? 32 : 39;

  return (
    <div className="relative flex h-85 sm:h-115 lg:h-120 w-85 sm:w-115 lg:w-120 mx-auto items-center justify-center select-none isolate">
      {/* ── AMBIENT NEON BLUE GLOW BEHIND ORBIT (Tenue, elegante y permanente) ── */}
      {/* Capa 1: Aura amplia difuminada azul neón tenue */}
      <div 
        className="absolute inset-[-10%] sm:inset-[-15%] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(0, 229, 255, 0.18) 0%, rgba(14, 165, 233, 0.15) 40%, rgba(2, 132, 199, 0.04) 65%, transparent 80%)',
          filter: 'blur(150px)',
        }}
        aria-hidden="true" 
      />
      {/* Capa 2: Resplandor centrado sutil que resalta las órbitas */}
      <div 
        className="absolute w-75 h-75 sm:w-105 sm:h-105 rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(0, 229, 255, 0.22) 0%, rgba(6, 182, 212, 0.12) 50%, rgba(8, 145, 178, 0.03) 70%, transparent 85%)',
          filter: 'blur(80px)',
        }}
        aria-hidden="true" 
      />

      {/* ── CENTRAL CORE: Glowing LVLUP Reactor Badge ── */}
      <div className="relative z-20 flex items-center justify-center w-12 h-12 sm:w-15 sm:h-15 rounded-full bg-[#08020e]/95 border-2 border-brand-cyan shadow-[0_0_28px_rgba(0,229,255,0.95),0_0_60px_rgba(0,229,255,0.45)] backdrop-blur-xl group hover:scale-110 transition-transform duration-300">
        {/* Pulsing Backlight */}
        <div className="absolute -inset-2 rounded-full bg-cyan-400/35 blur-md animate-pulse pointer-events-none z-0" />
        
        <LogoIcon size={isMobile ? 24 : 32} className="relative z-10 drop-shadow-[0_0_14px_#00E5FF]" />
      </div>

      {/* ── ORBIT 1 (INNER): 3 Icons spaced at 120° (0s, 8s, 16s of 24s) ── */}
      {/* 1.1 Gamepad (0°) */}
      <OrbitingCircles
        radius={innerRadius}
        duration={24}
        delay={0}
        path={true}
        pathStroke="rgba(0, 229, 255, 0.45)"
        pathGlowColor="rgba(0, 229, 255, 0.65)"
        pathDashArray="4 6"
        iconSize={innerIconSize}
      >
        <div className="w-full h-full rounded-full border border-cyan-400/80 bg-[#041a29]/95 shadow-[0_0_18px_rgba(0,229,255,0.7)] flex items-center justify-center p-1.5 text-cyan-300 drop-shadow-[0_0_8px_#00e5ff]" title="PlayStation 5 & Arena Gaming">
          <GamepadIcon size={isMobile ? 15 : 18} />
        </div>
      </OrbitingCircles>

      {/* 1.2 Cocktail (120°) */}
      <OrbitingCircles
        radius={innerRadius}
        duration={24}
        delay={8}
        path={false}
        iconSize={innerIconSize}
      >
        <div className="w-full h-full rounded-full border border-pink-400/80 bg-[#280417]/95 shadow-[0_0_18px_rgba(255,0,92,0.7)] flex items-center justify-center p-1.5 text-pink-400 drop-shadow-[0_0_8px_#ff005c]" title="Coctelería de Autor Galáctica">
          <CocktailIcon size={isMobile ? 15 : 18} />
        </div>
      </OrbitingCircles>

      {/* 1.3 Swords / PvP Battles (240°) */}
      <OrbitingCircles
        radius={innerRadius}
        duration={24}
        delay={16}
        path={false}
        iconSize={innerIconSize}
      >
        <div className="w-full h-full rounded-full border border-emerald-400/80 bg-[#042017]/95 shadow-[0_0_18px_rgba(52,211,153,0.7)] flex items-center justify-center p-1.5 text-emerald-300 drop-shadow-[0_0_8px_#34d399]" title="Torneos PvP & Desafíos Gaming">
          <Swords size={isMobile ? 14 : 17} />
        </div>
      </OrbitingCircles>

      {/* ── ORBIT 2 (MIDDLE, REVERSE): 4 Icons spaced at 90° (0s, 8s, 16s, 24s of 32s) ── */}
      {/* 2.1 Burger (0°) */}
      <OrbitingCircles
        radius={middleRadius}
        duration={32}
        delay={0}
        reverse
        path={true}
        pathStroke="rgba(181, 0, 255, 0.45)"
        pathGlowColor="rgba(181, 0, 255, 0.65)"
        pathDashArray="5 7"
        iconSize={middleIconSize}
      >
        <div className="w-full h-full rounded-full border border-amber-400/80 bg-[#241302]/95 shadow-[0_0_18px_rgba(251,191,36,0.7)] flex items-center justify-center p-1.5 text-amber-400 drop-shadow-[0_0_8px_#ffb703]" title="Burgers Smash & Gastronomía">
          <BurgerIcon size={isMobile ? 16 : 19} />
        </div>
      </OrbitingCircles>

      {/* 2.2 Trophy (90°) */}
      <OrbitingCircles
        radius={middleRadius}
        duration={32}
        delay={8}
        reverse
        path={false}
        iconSize={middleIconSize}
      >
        <div className="w-full h-full rounded-full border border-yellow-300/80 bg-[#221c02]/95 shadow-[0_0_18px_rgba(253,224,71,0.7)] flex items-center justify-center p-1.5 text-yellow-300 drop-shadow-[0_0_8px_#ffd166]" title="Competencias y Torneos eSports">
          <Trophy size={isMobile ? 15 : 18} />
        </div>
      </OrbitingCircles>

      {/* 2.3 Sparkles (180°) */}
      <OrbitingCircles
        radius={middleRadius}
        duration={32}
        delay={16}
        reverse
        path={false}
        iconSize={middleIconSize}
      >
        <div className="w-full h-full rounded-full border border-purple-400/80 bg-[#1e032d]/95 shadow-[0_0_18px_rgba(192,132,252,0.7)] flex items-center justify-center p-1.5 text-purple-300 drop-shadow-[0_0_8px_#c77dff]" title="Atmósfera Inmersiva">
          <Sparkles size={isMobile ? 15 : 18} />
        </div>
      </OrbitingCircles>

      {/* 2.4 Beer (270°) */}
      <OrbitingCircles
        radius={middleRadius}
        duration={32}
        delay={24}
        reverse
        path={false}
        iconSize={middleIconSize}
      >
        <div className="w-full h-full rounded-full border border-sky-400/80 bg-[#021828]/95 shadow-[0_0_18px_rgba(56,189,248,0.7)] flex items-center justify-center p-1.5 text-sky-300 drop-shadow-[0_0_8px_#38bdf8]" title="Bar & Cervezas Artesanales">
          <Beer size={isMobile ? 15 : 18} />
        </div>
      </OrbitingCircles>

      {/* ── ORBIT 3 (OUTER): 5 Icons spaced at 72° (0s, 9s, 18s, 27s, 36s of 45s) ── */}
      {/* 3.1 Dices (0°) */}
      <OrbitingCircles
        radius={outerRadius}
        duration={45}
        delay={0}
        path={true}
        pathStroke="rgba(255, 0, 92, 0.4)"
        pathGlowColor="rgba(255, 0, 92, 0.6)"
        pathDashArray="6 8"
        iconSize={outerIconSize}
      >
        <div className="w-full h-full rounded-full border border-emerald-400/80 bg-[#021d13]/95 shadow-[0_0_18px_rgba(52,211,153,0.7)] flex items-center justify-center p-1.5 text-emerald-300 drop-shadow-[0_0_8px_#06d6a0]" title="Mesa de Billar & Jenga XXL">
          <Dices size={isMobile ? 16 : 19} />
        </div>
      </OrbitingCircles>

      {/* 3.2 Headphones (72°) */}
      <OrbitingCircles
        radius={outerRadius}
        duration={45}
        delay={9}
        path={false}
        iconSize={outerIconSize}
      >
        <div className="w-full h-full rounded-full border border-cyan-400/80 bg-[#021e29]/95 shadow-[0_0_18px_rgba(34,211,238,0.7)] flex items-center justify-center p-1.5 text-cyan-300 drop-shadow-[0_0_8px_#22d3ee]" title="Música Lounge & Ambiente">
          <Headphones size={isMobile ? 16 : 19} />
        </div>
      </OrbitingCircles>

      {/* 3.3 Zap (144°) */}
      <OrbitingCircles
        radius={outerRadius}
        duration={45}
        delay={18}
        path={false}
        iconSize={outerIconSize}
      >
        <div className="w-full h-full rounded-full border border-amber-300/80 bg-[#241a02]/95 shadow-[0_0_18px_rgba(252,211,77,0.7)] flex items-center justify-center p-1.5 text-amber-200 drop-shadow-[0_0_8px_#fcd34d]" title="Happy Hours & Promos 2x1">
          <ZapIcon size={isMobile ? 16 : 19} />
        </div>
      </OrbitingCircles>

      {/* 3.4 Flame (216°) */}
      <OrbitingCircles
        radius={outerRadius}
        duration={45}
        delay={27}
        path={false}
        iconSize={outerIconSize}
      >
        <div className="w-full h-full rounded-full border border-red-400/80 bg-[#280303]/95 shadow-[0_0_18px_rgba(248,113,113,0.7)] flex items-center justify-center p-1.5 text-red-400 drop-shadow-[0_0_8px_#ef4444]" title="Hot Snacks & Alitas Flameadas">
          <Flame size={isMobile ? 16 : 19} />
        </div>
      </OrbitingCircles>

      {/* 3.5 Rocket (288°) */}
      <OrbitingCircles
        radius={outerRadius}
        duration={45}
        delay={36}
        path={false}
        iconSize={outerIconSize}
      >
        <div className="w-full h-full rounded-full border border-fuchsia-400/80 bg-[#260324]/95 shadow-[0_0_18px_rgba(232,121,249,0.7)] flex items-center justify-center p-1.5 text-fuchsia-300 drop-shadow-[0_0_8px_#e879f9]" title="Experiencia Galáctica de Otro Planeta">
          <Rocket size={isMobile ? 15 : 18} />
        </div>
      </OrbitingCircles>
    </div>
  );
}
