import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../../application/context/useStore';
import { CloseIcon, ZapIcon, CheckIcon } from '../icons/CustomIcons';

/* ──────────────────────────────────────────────
   LIVE ADMIN MODAL — Panel Demo para gstudiodevs.com
   Permite demostrar en vivo la gestion del menu
   sin backend. Ideal para ventas del servicio.
   ────────────────────────────────────────────── */

export function LiveAdminBanner() {
  const { isAdminMode, toggleAdminMode, menuItems } = useStore();

  const totalItems = menuItems.length;
  const availableItems = menuItems.filter(i => i.disponible).length;
  const popularItems = menuItems.filter(i => i.popular).length;

  return (
    <AnimatePresence>
      {isAdminMode && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div
            className="relative border-b"
            style={{
              background: 'linear-gradient(90deg, rgba(181,0,255,0.15) 0%, rgba(10,10,16,0.9) 50%, rgba(0,229,255,0.08) 100%)',
              borderColor: 'rgba(181,0,255,0.25)',
            }}
            role="banner"
            aria-label="Panel de administracion activo"
          >
            <div className="container-site py-3 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-brand-purple-light animate-pulse-glow shadow-[0_0_8px_#C633FF]" aria-hidden="true" />
                  <span className="text-[12px] font-black tracking-widest text-brand-purple-light uppercase">
                    Modo Administrador — Activo
                  </span>
                </div>
                <div className="hidden md:flex items-center gap-4 text-[11px] text-brand-gray">
                  <span className="flex items-center gap-1">
                    <CheckIcon size={11} className="text-green-400" aria-hidden="true" />
                    {availableItems} disponibles
                  </span>
                  <span>{totalItems - availableItems} agotados</span>
                  <span className="flex items-center gap-1">
                    <ZapIcon size={11} className="text-brand-pink" aria-hidden="true" />
                    {popularItems} populares
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-brand-gray hidden sm:block">
                  Haz clic en precios del menu para editarlos
                </span>
                <button
                  onClick={toggleAdminMode}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] border border-white/10 text-[11px] font-bold text-white/70 hover:text-white hover:bg-white/10 transition-all"
                  aria-label="Desactivar modo administrador"
                >
                  <CloseIcon size={12} aria-hidden="true" />
                  Salir Admin
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
