import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const NAV_LINKS = [
  { href: '#games', label: 'GAMES' },
  { href: '#planes', label: 'PLANES' },
  { href: '#torneos', label: 'TORNEOS' },
  { href: '/menu', label: 'MENÚ' },
] as const;

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-4">
      <nav className="max-w-6xl mx-auto flex justify-between items-center px-6 py-3 rounded-2xl bg-brand-darker/60 backdrop-blur-xl border border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold italic tracking-wider text-white hover:text-brand-cyan transition-colors">
          LVLUP
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex space-x-8 items-center text-sm font-semibold tracking-wide">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white/70 hover:text-brand-cyan transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA button */}
        <div className="hidden md:block">
          <a
            href="#reservar"
            className="bg-brand-pink text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wide btn-pink-glow"
          >
            Reservar
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg text-white/70 hover:text-white transition-all"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="max-w-6xl mx-auto mt-2 rounded-2xl bg-brand-darker/90 backdrop-blur-xl border border-white/5 px-6 pb-6 pt-4 md:hidden">
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="py-2 text-sm font-semibold tracking-wide text-white/70 hover:text-brand-cyan transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#reservar"
              className="mt-2 text-center bg-brand-pink text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wide btn-pink-glow"
            >
              Reservar
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
