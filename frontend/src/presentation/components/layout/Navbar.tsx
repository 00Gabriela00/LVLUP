import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogoIcon, MenuIcon, CloseIcon } from '../icons/CustomIcons';

const NAV_LINKS = [
  { href: '#promos', label: 'Promos', id: 'promos' },
  { href: '#servicios', label: 'Servicios', id: 'servicios' },
  { href: '#gaming', label: 'Gaming', id: 'gaming' },
  { href: '#menu', label: 'Menú', id: 'menu' },
  { href: '#contacto', label: 'Contacto', id: 'contacto' },
] as const;

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  // Deteccion dinamica de seccion al scrollear
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);

    const scrollPosition = window.scrollY + 180; // Offset de altura de navbar y anticipacion visual
    let currentActive = '';

    for (const link of NAV_LINKS) {
      const section = document.getElementById(link.id);
      if (section) {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          currentActive = link.id;
          break;
        }
      }
    }

    // Si al principio Hero ningun enlace es resaltado
    if (window.scrollY < 150) {
      currentActive = '';
    }

    setActiveSection(currentActive);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    const rId = requestAnimationFrame(() => handleScroll());
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rId);
    };
  }, [handleScroll]);

  // Cierra el menu mobil al cambiar a escritorio
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Smooth scroll handler
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActiveSection(id);
    setIsOpen(false);

    const target = document.getElementById(id);
    if (target) {
      const navOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setActiveSection('');
    setIsOpen(false);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'py-2' : 'py-3.5'
        }`}
        role="banner"
      >
        <div className="container-site">
          <nav
            className={`flex items-center justify-between px-5 py-2.5 rounded-2xl transition-all duration-300 ${
              isScrolled
                ? 'bg-[#050508]/85 backdrop-blur-xl border border-white/8 shadow-[0_8px_32px_rgba(0,0,0,0.7),0_0_20px_rgba(0,229,255,0.04)]'
                : 'bg-[#050508]/60 backdrop-blur-md border border-white/4'
            }`}
            aria-label="Navegación principal"
          >
            {/* Logo */}
            <a
              href="#inicio"
              onClick={handleLogoClick}
              className="flex items-center gap-2.5 group cursor-pointer"
              aria-label="LVLUP Game Bar — Inicio"
            >
              <LogoIcon size={36} className="transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-2" />
              <div>
                <div className="text-lg font-black italic tracking-tight text-white leading-none">
                  LVL<span className="text-brand-cyan drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]">UP</span>
                </div>
                <div className="text-[9px] font-semibold tracking-[0.22em] text-brand-gray uppercase leading-none mt-0.5">
                  Game Bar & Lounge
                </div>
              </div>
            </a>

            {/* Navegacion de escritorio con pill dinamico */}
            <div className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-white/2 border border-white/3" role="navigation">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.id)}
                    className={`relative px-4 py-2 rounded-lg text-[13px] font-semibold tracking-wide transition-all duration-200 cursor-pointer select-none ${
                      isActive
                        ? 'text-brand-cyan font-bold text-glow-cyan'
                        : 'text-brand-gray hover:text-white hover:bg-white/4'
                    }`}
                  >
                    {/* Pill background dinamico detras de tab activo */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavPill"
                        className="absolute inset-0 rounded-lg bg-linear-to-r from-brand-cyan/15 via-brand-purple/10 to-brand-pink/15 border border-brand-cyan/30 shadow-[0_0_16px_rgba(0,229,255,0.18)] -z-10"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    {link.label}
                    {/* Micro punto brillante activo */}
                    {isActive && (
                      <motion.span
                        layoutId="activeNavDot"
                        className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-cyan shadow-[0_0_8px_#00E5FF]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Lado derecho: Boton hamburguesa mobil */}
            <div className="flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/7 border border-white/5 transition-all"
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
              >
                {isOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
              </button>
            </div>
          </nav>

          {/* Panel del menu mobil */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                id="mobile-menu"
                initial={{ opacity: 0, y: -12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="md:hidden mt-2 rounded-2xl bg-[#050508]/95 backdrop-blur-2xl border border-white/8 p-4 shadow-[0_16px_48px_rgba(0,0,0,0.8)]"
                role="navigation"
                aria-label="Navegación mobile"
              >
                <div className="flex flex-col gap-1.5">
                  {NAV_LINKS.map((link) => {
                    const isActive = activeSection === link.id;
                    return (
                      <a
                        key={link.id}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.id)}
                        className={`flex items-center justify-between py-3 px-4 rounded-xl text-[14px] font-semibold transition-all ${
                          isActive
                            ? 'bg-linear-to-r from-brand-cyan/15 to-transparent border border-brand-cyan/30 text-brand-cyan font-bold'
                            : 'text-white/75 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <span>{link.label}</span>
                        {isActive && (
                          <span className="w-2 h-2 rounded-full bg-brand-cyan shadow-[0_0_8px_#00E5FF]" />
                        )}
                      </a>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  );
}
