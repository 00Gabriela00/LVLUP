import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/sections/Hero';
import { GamesCatalog } from '../components/sections/GamesCatalog';
import { PricingPlans } from '../components/sections/PricingPlans';
import { Tournaments } from '../components/sections/Tournaments';

export function LandingPage() {
  return (
    <div className="font-sans antialiased relative overflow-x-hidden min-h-screen">
      {/* Background glows */}
      <div className="absolute top-[-10%] right-[-5%] w-150 h-150 bg-brand-pink rounded-full blur-[120px] opacity-20 -z-10 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-200 bg-cyan-radial -z-10 opacity-50"></div>
      <div className="absolute top-[20%] right-0 w-200 h-200 bg-glow-radial -z-10 opacity-40"></div>

      <Navbar />

      <Hero />

      <main className="container mx-auto px-6 py-16 space-y-32">
        <GamesCatalog />
        <PricingPlans />
        <Tournaments />
      </main>

      <Footer />
    </div>
  );
}
