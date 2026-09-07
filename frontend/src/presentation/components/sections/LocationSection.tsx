import { motion } from 'framer-motion';
import { useStore } from '../../../application/context/useStore';
import { MapPinIcon, ClockIcon, WhatsAppIcon, InstagramIcon } from '../icons/CustomIcons';

const DAYS_ORDER = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];

function isOpenNow(): boolean {
  const now = new Date();
  const hour = now.getHours();
  const day = now.getDay(); // 0 = Domingo, 5 = Viernes, 6 = Sabado
  const closeHour = day === 5 || day === 6 ? 2 : 0;
  const openHour = day === 6 || day === 0 ? 12 : 14;
  return hour >= openHour || (closeHour > 0 && hour < closeHour);
}

export function LocationSection() {
  const { infoGeneral } = useStore();
  const open = isOpenNow();
  const { ubicacion, horarios, contacto } = infoGeneral;

  const todayIndex = new Date().getDay(); // 0 is Sunday
  const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
  const todayName = dayNames[todayIndex];

  return (
    <section id="contacto" className="relative py-24 overflow-hidden" aria-labelledby="contacto-heading">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-125 bg-brand-purple/4 blur-[150px] -z-10 pointer-events-none" aria-hidden="true" />

      <div className="container-site">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <h2 id="contacto-heading" className="section-title mt-2">
            <span className="section-title-deco">Ubicación & Horarios</span>
          </h2>
          <p className="text-white/75 text-[1.05rem] leading-relaxed max-w-135 mx-auto mt-4 font-normal">
            Estamos listos para recibirte en {ubicacion.lugar}. Llégate directamente al local, pide en barra y vive la experiencia LVLUP.
          </p>
        </motion.div>

        {/* 2-Column Balanced Executive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
          {/* Left Column: Venue & Contact Channels (6 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col justify-between gap-6"
          >
            {/* Venue Location Card */}
            <div
              className="loot svc-loot flex-1"
              style={{ '--c1': '#13141f', '--c2': '#00E5FF' } as React.CSSProperties}
            >
              <div className="loot-inner relative flex flex-col justify-between h-full p-7">
                <div>
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-brand-cyan/10 border border-brand-cyan/25 flex items-center justify-center text-brand-cyan shadow-[0_0_20px_rgba(0,229,255,0.15)]">
                    <MapPinIcon size={22} aria-hidden="true" />
                  </div>
                  <div
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider border ${
                      open
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                        : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${open ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`}
                    />
                    <span>{open ? 'Abierto Ahora' : 'Cerrado Ahora'}</span>
                  </div>
                </div>

                <h3 className="text-[22px] font-black text-white leading-tight mb-1.5">
                  {ubicacion.lugar}
                </h3>
                <p className="text-[13px] text-white/60 mb-6">
                  {ubicacion.ciudad} · Acceso directo y estacionamiento seguro.
                </p>
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  ubicacion.lugar + ', ' + ubicacion.ciudad
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 w-full py-3.5 px-5 rounded-2xl bg-white/4 hover:bg-brand-cyan/15 border border-white/8 hover:border-brand-cyan/50 text-white hover:text-brand-cyan font-bold text-[13px] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.3)] group"
              >
                <span>Cómo Llegar en Google Maps</span>
                <span className="text-brand-cyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true">↗</span>
              </a>
              </div>
            </div>

            {/* Structured Contact Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={`https://wa.me/${contacto.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4.5 rounded-2xl bg-[#0e040c]/85 border border-[#25D366]/20 hover:border-[#25D366]/60 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.4)] flex items-center gap-3.5"
                aria-label="WhatsApp Oficial"
              >
                <div className="w-11 h-11 rounded-xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <WhatsAppIcon size={22} />
                </div>
                <div className="min-w-0">
                  <div className="text-[13px] font-black text-white leading-snug truncate">WhatsApp Barra</div>
                  <div className="text-[11px] text-[#25D366] font-semibold mt-0.5 truncate">Chat Directo</div>
                </div>
              </a>

              <a
                href={`https://www.instagram.com/${contacto.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4.5 rounded-2xl bg-[#0e040c]/85 border border-brand-pink/20 hover:border-brand-pink/60 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.4)] flex items-center gap-3.5"
                aria-label="Instagram Oficial"
              >
                <div className="w-11 h-11 rounded-xl bg-brand-pink/15 text-brand-pink flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <InstagramIcon size={22} />
                </div>
                <div className="min-w-0">
                  <div className="text-[13px] font-black text-white leading-snug truncate">Instagram</div>
                  <div className="text-[11px] text-brand-pink font-semibold mt-0.5 truncate">{contacto.instagram}</div>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Weekly Schedule Card (6 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-6 loot svc-loot h-full"
            style={{ '--c1': '#13141f', '--c2': '#F43F6E' } as React.CSSProperties}
          >
            <div className="loot-inner relative flex flex-col justify-between h-full p-7">
              <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-brand-pink/10 border border-brand-pink/25 flex items-center justify-center text-brand-pink shadow-[0_0_20px_rgba(255,0,92,0.15)]">
                  <ClockIcon size={22} aria-hidden="true" />
                </div>
                <div>
                  <span className="text-[10px] font-black tracking-[0.2em] text-brand-pink uppercase">
                    Horario de Puertas Abiertas
                  </span>
                  <h3 className="text-[19px] font-black text-white">Todos los Días de la Semana</h3>
                </div>
              </div>

              {/* Schedule List */}
              <div className="space-y-1.5" role="list" aria-label="Horarios de atención por día">
                {DAYS_ORDER.map((day) => {
                  const horario = horarios[day] || '2:00 PM — 12:00 AM';
                  const isToday = todayName === day;

                  return (
                    <div
                      key={day}
                      role="listitem"
                      className={`flex items-center justify-between py-2.5 px-4 rounded-xl transition-all duration-200 ${
                        isToday
                          ? 'bg-linear-to-r from-brand-cyan/20 via-brand-cyan/5 to-transparent border border-brand-cyan/40 text-white shadow-[0_0_20px_rgba(0,229,255,0.08)]'
                          : 'bg-white/2 border border-white/2 text-white/70 hover:bg-white/4'
                      }`}
                    >
                      <span className="text-[13px] font-bold flex items-center gap-2">
                        <span className={isToday ? 'text-white font-black' : 'text-white/80'}>{day}</span>
                        {isToday && (
                          <span className="px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-brand-cyan text-slate-950 shadow-[0_0_10px_#00E5FF]">
                            Hoy
                          </span>
                        )}
                      </span>
                      <span
                        className={`text-[13px] font-black ${
                          isToday ? 'text-brand-cyan text-glow-cyan' : 'text-white/90'
                        }`}
                      >
                        {horario}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-5 border-t border-white/6 mt-6 flex items-center justify-between text-[11.5px] text-white/50">
              <span>Atención directa en barra y mesas</span>
              <span className="text-white/75 font-bold">Precios en USD</span>
            </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
