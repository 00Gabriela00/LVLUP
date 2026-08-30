import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/sections/Hero';
import { ServicesSection } from '../components/sections/ServicesSection';
import { MenuSection } from '../components/sections/MenuSection';
import { GamingSection } from '../components/sections/GamingSection';
import { PromosSection } from '../components/sections/PromosSection';
import { LocationSection } from '../components/sections/LocationSection';

/* ──────────────────────────────────────────────
   LANDING PAGE — Page Assembly
   ────────────────────────────────────────────── */
export function LandingPage() {
  return (
    <div className="font-sans antialiased min-h-screen bg-[#080307] text-white overflow-x-hidden relative selection:bg-brand-pink/30 selection:text-white">
      {/* Atmospheric Background: Deep Crimson Wine & Midnight Blue Mesh */}
      <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Top-Left: Deep Crimson / Wine */}
        <div className="absolute -top-[10%] -left-[10%] w-[800px] h-[800px] rounded-full bg-[#5a0018]/16 blur-[160px]" />
        
        {/* Top-Right: Deep Midnight Cyan / Blue */}
        <div className="absolute -top-[10%] -right-[10%] w-[800px] h-[800px] rounded-full bg-[#00283d]/18 blur-[160px]" />
        
        {/* Bottom-Left: Deep Midnight Blue */}
        <div className="absolute -bottom-[10%] -left-[10%] w-[750px] h-[750px] rounded-full bg-[#001f33]/15 blur-[160px]" />
        
        {/* Bottom-Right: Deep Wine / Ruby */}
        <div className="absolute -bottom-[10%] -right-[10%] w-[750px] h-[750px] rounded-full bg-[#4a0014]/16 blur-[160px]" />

        {/* Global smooth radial contrast vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(4,1,3,0.7)_100%)]" />
      </div>

      {/* Skip to content for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[999] focus:px-4 focus:py-2 focus:bg-brand-cyan focus:text-brand-darker focus:font-bold focus:rounded-lg focus:text-sm"
      >
        Ir al contenido principal
      </a>

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main id="main-content" tabIndex={-1}>
        {/* Section 1: Hero */}
        <Hero />

        {/* Divider */}
        <div className="container-site">
          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" aria-hidden="true" />
        </div>

        {/* Section 2: Services */}
        <ServicesSection />

        {/* Section 3: Menu */}
        <MenuSection />

        {/* Section 4: Gaming */}
        <GamingSection />

        {/* Section 5: Promos (includes ticker) */}
        <PromosSection />

        {/* Section 6: Location & Contact */}
        <LocationSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
