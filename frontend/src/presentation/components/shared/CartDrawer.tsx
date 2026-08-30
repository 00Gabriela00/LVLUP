import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../../application/context/useStore';
import { CloseIcon, TrashIcon, PlusIcon, MinusIcon, WhatsAppIcon, CartIcon } from '../icons/CustomIcons';
import { infoGeneral } from '../../../infrastructure/data/initialData';

/* ──────────────────────────────────────────────
   CART DRAWER
   Armador de pedido con boton de envio a WhatsApp
   ────────────────────────────────────────────── */

function buildWhatsAppMessage(
  cartMenuItems: ReturnType<typeof useStore>['cartMenuItems'],
  cartConsolas: ReturnType<typeof useStore>['cartConsolas'],
  total: number
): string {
  const lines: string[] = [
    'Hola LVLUP! Me gustaria hacer un pedido:',
    '',
  ];

  if (cartMenuItems.length > 0) {
    lines.push('--- MENU ---');
    cartMenuItems.forEach(c => {
      lines.push(`x${c.cantidad} ${c.item.nombre} — $${(c.item.precio * c.cantidad).toFixed(2)}`);
    });
    lines.push('');
  }

  if (cartConsolas.length > 0) {
    lines.push('--- GAMING ---');
    cartConsolas.forEach(c => {
      const price = c.duracion === '30min' ? c.station.precio30min : c.station.precio1hora;
      lines.push(`x${c.cantidad} ${c.station.nombre} (${c.duracion}) — $${((price ?? 0) * c.cantidad).toFixed(2)}`);
    });
    lines.push('');
  }

  lines.push(`TOTAL ESTIMADO: $${total.toFixed(2)}`);
  lines.push('');
  lines.push('Gracias!');

  return encodeURIComponent(lines.join('\n'));
}

export function CartDrawer() {
  const {
    isCartOpen, toggleCart, cartMenuItems, cartConsolas,
    updateMenuQty, removeMenuItem, removeConsola,
    cartTotal, cartCount, clearCart,
  } = useStore();

  const isEmpty = cartMenuItems.length === 0 && cartConsolas.length === 0;
  const whatsappNum = infoGeneral.contacto.whatsapp.replace(/\D/g, '');
  const msg = buildWhatsAppMessage(cartMenuItems, cartConsolas, cartTotal);
  const whatsappUrl = `https://wa.me/${whatsappNum}?text=${msg}`;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="drawer-overlay"
            onClick={toggleCart}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="drawer-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Carrito de pedidos"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.07]">
              <div className="flex items-center gap-3">
                <CartIcon size={20} className="text-brand-cyan" aria-hidden="true" />
                <div>
                  <div className="text-[15px] font-bold text-white">Mi Pedido</div>
                  <div className="text-[11px] text-brand-gray">{cartCount} items</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!isEmpty && (
                  <button
                    onClick={clearCart}
                    className="text-[11px] text-brand-gray hover:text-red-400 transition-colors font-semibold"
                    aria-label="Vaciar carrito"
                  >
                    Vaciar
                  </button>
                )}
                <button
                  onClick={toggleCart}
                  className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                  aria-label="Cerrar carrito"
                >
                  <CloseIcon size={16} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {isEmpty ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 py-20 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center opacity-40">
                    <CartIcon size={28} className="text-brand-gray" />
                  </div>
                  <div>
                    <div className="text-[15px] font-bold text-white mb-1">Carrito vacio</div>
                    <div className="text-[13px] text-brand-gray">
                      Agrega platos del menu o tiempo de consola
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* Menu Items */}
                  {cartMenuItems.length > 0 && (
                    <div>
                      <div className="text-[10px] font-black tracking-[0.2em] text-brand-gray uppercase mb-3">Menu</div>
                      <div className="space-y-2.5">
                        {cartMenuItems.map(({ item, cantidad }) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-3 bg-white/[0.04] border border-white/[0.06] rounded-xl px-3 py-3"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="text-[13px] font-bold text-white truncate">{item.nombre}</div>
                              <div className="text-[11px] text-brand-gray mt-0.5">${item.precio.toFixed(2)} c/u</div>
                            </div>
                            <div className="qty-stepper flex-shrink-0">
                              <button onClick={() => updateMenuQty(item.id, cantidad - 1)} aria-label={`Reducir cantidad de ${item.nombre}`}>
                                <MinusIcon size={12} />
                              </button>
                              <span aria-live="polite">{cantidad}</span>
                              <button onClick={() => updateMenuQty(item.id, cantidad + 1)} aria-label={`Aumentar cantidad de ${item.nombre}`}>
                                <PlusIcon size={12} />
                              </button>
                            </div>
                            <div className="text-[13px] font-black text-white w-14 text-right flex-shrink-0">
                              ${(item.precio * cantidad).toFixed(2)}
                            </div>
                            <button
                              onClick={() => removeMenuItem(item.id)}
                              className="w-7 h-7 rounded-lg flex items-center justify-center text-brand-gray hover:text-red-400 hover:bg-red-500/10 transition-all flex-shrink-0"
                              aria-label={`Eliminar ${item.nombre}`}
                            >
                              <TrashIcon size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Consola Items */}
                  {cartConsolas.length > 0 && (
                    <div>
                      <div className="text-[10px] font-black tracking-[0.2em] text-brand-gray uppercase mb-3 mt-4">Gaming</div>
                      <div className="space-y-2.5">
                        {cartConsolas.map(({ station, duracion, cantidad }) => {
                          const price = (duracion === '30min' ? station.precio30min : station.precio1hora) ?? 0;
                          const key = `${station.id}-${duracion}`;
                          return (
                            <div
                              key={key}
                              className="flex items-center gap-3 bg-brand-cyan/[0.05] border border-brand-cyan/10 rounded-xl px-3 py-3"
                            >
                              <div className="flex-1 min-w-0">
                                <div className="text-[13px] font-bold text-white truncate">{station.nombre}</div>
                                <div className="text-[11px] text-brand-cyan mt-0.5">{duracion} — ${price.toFixed(2)}/c</div>
                              </div>
                              <div className="text-[11px] font-bold text-brand-gray px-2">x{cantidad}</div>
                              <div className="text-[13px] font-black text-brand-cyan w-14 text-right">
                                ${(price * cantidad).toFixed(2)}
                              </div>
                              <button
                                onClick={() => removeConsola(key)}
                                className="w-7 h-7 rounded-lg flex items-center justify-center text-brand-gray hover:text-red-400 hover:bg-red-500/10 transition-all"
                                aria-label={`Eliminar ${station.nombre} ${duracion}`}
                              >
                                <TrashIcon size={14} />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Footer */}
            {!isEmpty && (
              <div className="px-5 py-4 border-t border-white/[0.07] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[14px] font-semibold text-brand-gray">Total estimado</span>
                  <span className="text-[24px] font-black text-white">${cartTotal.toFixed(2)}</span>
                </div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl font-bold text-[14px] tracking-wide transition-all"
                  style={{ background: '#25D366', color: 'white' }}
                  aria-label={`Enviar pedido por WhatsApp — Total $${cartTotal.toFixed(2)}`}
                >
                  <WhatsAppIcon size={18} aria-hidden="true" />
                  Enviar Pedido por WhatsApp
                </a>
                <p className="text-[11px] text-brand-gray text-center leading-relaxed">
                  Se abrira WhatsApp con tu pedido listo. Confirmacion y pago en local.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
