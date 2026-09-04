import { LogoIcon, InstagramIcon, WhatsAppIcon } from '../icons/CustomIcons';
import { infoGeneral } from '../../../infrastructure/data/initialData';

const NAV_LINKS = [
  { href: '#servicios', label: 'Zonas' },
  { href: '#menu', label: 'Menú' },
  { href: '#gaming', label: 'Gaming' },
  { href: '#promos', label: 'Promos' },
  { href: '#contacto', label: 'Ubicación' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#050205] border-t border-white/6 pt-12 pb-8" role="contentinfo">
      {/* Top subtle glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-brand-cyan/30 to-transparent"
        aria-hidden="true"
      />

      <div className="container-site">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-white/6">
          {/* Brand */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <a href="/" className="flex items-center gap-3 group" aria-label="LVLUP — Inicio">
              <LogoIcon size={34} />
              <div>
                <div className="text-[19px] font-black italic text-white leading-none">
                  LVL<span className="text-brand-cyan">UP</span>
                </div>
                <div className="text-[9px] font-semibold tracking-[0.24em] text-brand-gray uppercase mt-0.5">
                  Game Bar & Lounge
                </div>
                </div>
            </a>
            <span className="hidden sm:block text-white/20 text-xs">|</span>
            <p className="text-[12px] text-brand-gray">
              {infoGeneral.ubicacion.lugar} · {infoGeneral.ubicacion.ciudad}
            </p>
          </div>

          {/* Quick Nav */}
          <nav aria-label="Navegación pie de página">
            <ul className="flex flex-wrap items-center justify-center gap-5 sm:gap-7" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.href} role="listitem">
                  <a
                    href={link.href}
                    className="text-[13px] text-brand-gray hover:text-brand-cyan transition-colors font-semibold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${infoGeneral.contacto.whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-white/3 hover:bg-[#25D366]/15 border border-white/8 hover:border-[#25D366]/40 flex items-center justify-center text-white/80 hover:text-[#25D366] transition-all"
              aria-label="WhatsApp LVLUP"
            >
              <WhatsAppIcon size={18} />
            </a>
            <a
              href={`https://www.instagram.com/${infoGeneral.contacto.instagram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-white/3 hover:bg-brand-pink/15 border border-white/8 hover:border-brand-pink/40 flex items-center justify-center text-white/80 hover:text-brand-pink transition-all"
              aria-label="Instagram LVLUP"
            >
              <InstagramIcon size={18} />
            </a>
          </div>
        </div>

        {/* Copyright & Dev Credit */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-[11.5px] text-brand-gray">
          <div>
            &copy; {year} LVLUP Game Bar & Lounge. Todos los derechos reservados.
          </div>
          <div>
            Diseñado & Desarrollado por{' '}
            <a
              href="https://gstudiodevs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-cyan hover:underline font-bold"
            >
              GStudioDevs
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
