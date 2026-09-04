import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/sections/Hero';
import { ServicesSection } from '../components/sections/ServicesSection';
import { MenuSection } from '../components/sections/MenuSection';
import { GamingSection } from '../components/sections/GamingSection';
import { PromosSection } from '../components/sections/PromosSection';
import { LocationSection } from '../components/sections/LocationSection';
import { StarfieldBackground } from '../components/common/StarfieldBackground';

/* ──────────────────────────────────────────────
   LANDING PAGE — Page Assembly
   ────────────────────────────────────────────── */
export function LandingPage() {
  return (
    <div className="font-sans antialiased min-h-screen bg-[#050507] text-white overflow-x-hidden relative selection:bg-brand-pink/30 selection:text-white">
      {/* Canvas Animado de Estrellas (Starfield) */}
      <StarfieldBackground />

      {/* Atmospheric Background: Gradientes radiales idénticos al mockup (#050507, 30% 20% Purple & 85% 70% Cyan) */}
      <div
        className="pointer-events-none fixed inset-0 -z-40 overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse 900px 600px at 30% 20%, rgba(40, 20, 70, 0.55), transparent 60%),
            radial-gradient(ellipse 700px 500px at 85% 70%, rgba(10, 60, 70, 0.45), transparent 60%),
            #050507
          `,
        }}
        aria-hidden="true"
      />

      {/* Skip to content for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-999 focus:px-4 focus:py-2 focus:bg-brand-cyan focus:text-brand-darker focus:font-bold focus:rounded-lg focus:text-sm"
      >
        Ir al contenido principal
      </a>

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main id="main-content" tabIndex={-1}>
        {/* Section 1: Hero */}
        <Hero />

        {/* Section 2: Promos (includes ticker) */}
        <PromosSection />

        {/* Divider */}
        <div className="container-site">
          <div className="h-px bg-linear-to-r from-transparent via-white/8 to-transparent" aria-hidden="true" />
        </div>

        {/* Section 3: Services */}
        <ServicesSection />

        {/* Section 4: Gaming */}
        <GamingSection />

        {/* Section 5: Menu */}
        <MenuSection />

        {/* Section 6: Location & Contact */}
        <LocationSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
