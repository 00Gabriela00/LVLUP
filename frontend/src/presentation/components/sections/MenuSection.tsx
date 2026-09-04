import { useState, useMemo } from 'react';
import { useStore } from '../../../application/context/useStore';
import type { MenuItem, MenuCategory } from '../../../infrastructure/data/initialData';
import { SearchIcon, StarIcon, ZapIcon, CocktailIcon, BurgerIcon, SushiIcon, SnackIcon, FlameIcon } from '../icons/CustomIcons';

/* ──────────────────────────────────────────────
   TAB CONFIG
   ────────────────────────────────────────────── */
interface TabConfig {
  key: MenuCategory | 'todos';
  label: string;
  Icon: React.FC<{ size?: number; className?: string }>;
}

const TABS: TabConfig[] = [
  { key: 'todos', label: 'Todo', Icon: ({ size, className }) => (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden="true">
      <circle cx="5" cy="5" r="2.5"/><circle cx="15" cy="5" r="2.5"/><circle cx="5" cy="15" r="2.5"/><circle cx="15" cy="15" r="2.5"/>
    </svg>
  )},
  { key: 'cocteles', label: 'Cocteles', Icon: CocktailIcon },
  { key: 'burgers', label: 'Burgers', Icon: BurgerIcon },
  { key: 'sushi', label: 'Sushi & Rolls', Icon: SushiIcon },
  { key: 'snacks', label: 'Snacks', Icon: SnackIcon },
  { key: 'servicios', label: 'Licores', Icon: FlameIcon },
];

/* ──────────────────────────────────────────────
   MENU ITEM CARD — Ultra-Fast & Proportional Image Fit
   ────────────────────────────────────────────── */
function MenuCard({
  item,
  onSelect,
}: {
  item: MenuItem;
  onSelect: (item: MenuItem) => void;
}) {
  const { isAdminMode, toggleItemDisponible, toggleItemPopular, updateItemPrice } = useStore();
  const [editPrice, setEditPrice] = useState(false);
  const [tempPrice, setTempPrice] = useState(item.precio.toString());

  const handlePriceSubmit = () => {
    const p = parseFloat(tempPrice);
    if (!isNaN(p) && p > 0) updateItemPrice(item.id, p);
    setEditPrice(false);
  };

  return (
    <div
      onClick={() => !editPrice && onSelect(item)}
      className={`relative group rounded-2xl border transition-all duration-200 overflow-hidden flex flex-col justify-between cursor-pointer will-change-transform ${
        item.disponible
          ? 'bg-[#0e040c]/90 hover:bg-[#150613] border-white/8 hover:border-brand-cyan/40 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:-translate-y-1'
          : 'bg-[#080206]/60 border-white/4 opacity-50'
      }`}
      role="article"
      aria-label={`${item.nombre} — $${item.precio.toFixed(2)}`}
    >
      {/* Top subtle glow line on hover */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-brand-cyan/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Admin overlay actions */}
      {isAdminMode && (
        <div
          className="p-2 bg-black/80 border-b border-white/8 flex gap-1.5 z-20"
          role="group"
          aria-label="Controles admin"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => toggleItemDisponible(item.id)}
            className={`flex-1 py-1 rounded-lg text-[10px] font-bold tracking-wide transition-all ${
              item.disponible ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
            }`}
          >
            {item.disponible ? 'Disponible' : 'Agotado'}
          </button>
          <button
            onClick={() => toggleItemPopular(item.id)}
            className={`px-3 py-1 rounded-lg text-[10px] font-bold tracking-wide transition-all ${
              item.popular ? 'bg-brand-pink/20 text-brand-pink border border-brand-pink/30' : 'bg-white/5 text-brand-gray border border-white/10'
            }`}
          >
            Popular
          </button>
        </div>
      )}

      {/* Adaptative Photo Container (Fits Full Dish Cleanly) */}
      {item.foto && (
        <div className="w-full h-48 sm:h-52 overflow-hidden relative bg-[#070105] border-b border-white/6 flex items-center justify-center">
          <img
            src={item.foto}
            alt={item.nombre}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#0e040c] via-transparent to-transparent opacity-70 pointer-events-none" />
        </div>
      )}

      {/* Content Body */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Badges Row */}
          <div className="flex flex-wrap items-center gap-1.5 mb-3">
            {item.popular && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-brand-pink/15 text-brand-pink border border-brand-pink/30">
                <StarIcon size={10} aria-hidden="true" />
                Popular
              </span>
            )}
            {item.promo && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30">
                <ZapIcon size={10} aria-hidden="true" />
                {item.promo}
              </span>
            )}
            {item.etiquetas?.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md text-[10px] font-semibold text-white/70 bg-white/4 border border-white/6"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="text-[17px] font-black text-white leading-snug group-hover:text-brand-cyan transition-colors mb-1.5">
            {item.nombre}
          </h3>

          {/* Description */}
          <p className="text-[12.5px] text-white/65 leading-relaxed mb-4 line-clamp-2">
            {item.descripcion}
          </p>

          {/* Ingredients tags */}
          {item.ingredientes && item.ingredientes.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {item.ingredientes.slice(0, 3).map((ing) => (
                <span
                  key={ing}
                  className="text-[10px] font-medium text-brand-gray bg-black/30 px-2 py-0.5 rounded border border-white/3"
                >
                  {ing}
                </span>
              ))}
              {item.ingredientes.length > 3 && (
                <span className="text-[10px] font-medium text-brand-cyan/80 bg-brand-cyan/10 px-1.5 py-0.5 rounded">
                  +{item.ingredientes.length - 3} más
                </span>
              )}
            </div>
          )}
        </div>

        {/* Price & Availability Row */}
        <div className="pt-3 border-t border-white/6 flex items-center justify-between mt-auto">
          <div>
            {isAdminMode && editPrice ? (
              <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                <span className="text-brand-gray text-[13px]">$</span>
                <input
                  type="number"
                  step="0.5"
                  value={tempPrice}
                  onChange={(e) => setTempPrice(e.target.value)}
                  onBlur={handlePriceSubmit}
                  onKeyDown={(e) => e.key === 'Enter' && handlePriceSubmit()}
                  className="w-20 bg-white/10 border border-brand-cyan/40 rounded-lg px-2 py-1 text-brand-cyan text-[15px] font-black outline-none"
                  aria-label="Editar precio"
                />
              </div>
            ) : (
              <div
                className={`font-black text-white text-[20px] leading-none ${isAdminMode ? 'cursor-pointer hover:text-brand-cyan' : ''}`}
                onClick={(e) => {
                  if (isAdminMode) {
                    e.stopPropagation();
                    setEditPrice(true);
                  }
                }}
              >
                ${item.precio.toFixed(2)}
              </div>
            )}
            <span className="text-[10px] text-brand-gray block mt-0.5">USD</span>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-md border ${
                item.disponible
                  ? 'bg-brand-cyan/10 border-brand-cyan/25 text-brand-cyan'
                  : 'bg-red-500/10 border-red-500/25 text-red-400'
              }`}
            >
              {item.disponible ? 'Disponible' : 'Agotado'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   ITEM DETAIL MODAL
   ────────────────────────────────────────────── */
function ItemDetailModal({
  item,
  onClose,
}: {
  item: MenuItem | null;
  onClose: () => void;
}) {
  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.nombre}
    >
      <div
        className="relative max-w-lg w-full rounded-3xl bg-[#11050f] border border-white/12 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white/80 hover:text-white flex items-center justify-center transition-all"
          aria-label="Cerrar detalle"
        >
          ✕
        </button>

        {/* Photo Container — Proportional Fit */}
        {item.foto && (
          <div className="w-full max-h-80 overflow-hidden relative bg-[#070105] border-b border-white/8 flex items-center justify-center p-2">
            <img
              src={item.foto}
              alt={item.nombre}
              className="max-h-72 w-auto max-w-full object-contain mx-auto rounded-xl"
            />
          </div>
        )}

        {/* Body */}
        <div className="p-6">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {item.popular && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-[11px] font-black uppercase tracking-wider bg-brand-pink/20 text-brand-pink border border-brand-pink/30">
                <StarIcon size={11} aria-hidden="true" />
                Popular
              </span>
            )}
            {item.promo && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-[11px] font-black uppercase tracking-wider bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30">
                <ZapIcon size={11} aria-hidden="true" />
                {item.promo}
              </span>
            )}
            {item.etiquetas?.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-md text-[11px] font-semibold text-white/80 bg-white/6 border border-white/8"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h2 className="text-[24px] font-black text-white leading-tight mb-2">
            {item.nombre}
          </h2>

          {/* Description */}
          <p className="text-[14px] text-white/75 leading-relaxed mb-5">
            {item.descripcion}
          </p>

          {/* Ingredients */}
          {item.ingredientes && item.ingredientes.length > 0 && (
            <div className="mb-6">
              <div className="text-[11px] font-bold tracking-[0.2em] text-brand-cyan uppercase mb-2">
                Ingredientes & Notas
              </div>
              <div className="flex flex-wrap gap-1.5">
                {item.ingredientes.map((ing) => (
                  <span
                    key={ing}
                    className="text-[12px] font-medium text-white/90 bg-white/4 border border-white/8 px-3 py-1 rounded-lg"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Price */}
          <div className="pt-4 border-t border-white/8 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-brand-gray uppercase font-bold block">Precio en Barra</span>
              <span className="text-[28px] font-black text-white leading-none">
                ${item.precio.toFixed(2)}{' '}
                <span className="text-[14px] text-brand-gray font-semibold">USD</span>
              </span>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-cyan/15 border border-brand-cyan/30 text-brand-cyan text-[12px] font-bold">
                Pide directo en barra
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   MAIN MENU SECTION — Ultra High Performance
   ────────────────────────────────────────────── */
export function MenuSection() {
  const { menuItems, searchQuery, setSearch, activeCategory, setCategory, isAdminMode } = useStore();
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const filtered = useMemo(() => {
    return menuItems.filter((item) => {
      // 1. Filtro de categoria
      const matchCat =
        activeCategory === 'todos' ||
        item.categoria === activeCategory ||
        (activeCategory === 'promos' && Boolean(item.promo));

      // 2. Busqueda
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        item.nombre.toLowerCase().includes(q) ||
        item.descripcion.toLowerCase().includes(q) ||
        item.ingredientes?.some((ing) => ing.toLowerCase().includes(q)) ||
        item.etiquetas?.some((tag) => tag.toLowerCase().includes(q));

      return matchCat && matchSearch;
    });
  }, [menuItems, activeCategory, searchQuery]);

  return (
    <>
      <section id="menu" className="relative py-24" aria-labelledby="menu-heading">
        <div className="container-site">
          {/* Section Header */}
          <div className="mb-12">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 id="menu-heading" className="section-title text-white mt-2">
                  {isAdminMode ? (
                    <span className="text-brand-purple-light">Gestión de Menú</span>
                  ) : (
                    <span className="section-title-deco">Sabores Galácticos</span>
                  )}
                </h2>
              </div>
              {isAdminMode && (
                <div className="badge badge-purple text-[11px] py-2 px-4">
                  <ZapIcon size={12} aria-hidden="true" />
                  Haz clic en el precio para editarlo
                </div>
              )}
            </div>

            <p className="text-white/75 text-[1.05rem] leading-relaxed max-w-140 mt-4 font-normal">
              Desde cocteles de autor galácticos hasta burgers artesanales, rolls de sushi y snacks para compartir.
            </p>
          </div>

          {/* Search + Tabs */}
          <div className="flex flex-col gap-4 mb-9">
            {/* Search */}
            <div className="relative max-w-sm">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-gray pointer-events-none" aria-hidden="true">
                <SearchIcon size={16} />
              </div>
              <input
                type="search"
                placeholder="Buscar por plato, ingrediente o etiqueta..."
                value={searchQuery}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/4 hover:bg-white/6 border border-white/8 focus:border-brand-cyan/50 rounded-xl pl-10 pr-4 py-3 text-[13px] text-white placeholder:text-brand-gray outline-none transition-all shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
                aria-label="Buscar en el menu"
                id="menu-search"
              />
            </div>

            {/* Tabs */}
            <div className="tab-nav" role="tablist" aria-label="Categorias del menu">
              {TABS.map(({ key, label, Icon }) => (
                <button
                  key={key}
                  role="tab"
                  aria-selected={activeCategory === key}
                  aria-controls="menu-items-grid"
                  onClick={() => setCategory(key)}
                  className={`tab-btn ${activeCategory === key ? 'active' : ''}`}
                  id={`tab-${key}`}
                >
                  <Icon size={14} />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Items Grid — High Performance GPU CSS */}
          <div
            id="menu-items-grid"
            role="tabpanel"
            aria-labelledby={`tab-${activeCategory}`}
          >
            {filtered.length === 0 ? (
              <div className="text-center py-20 text-brand-gray">
                <div className="text-[40px] mb-3" aria-hidden="true">
                  <SearchIcon size={40} className="mx-auto opacity-30" />
                </div>
                <p className="text-[15px] font-semibold text-white/80">Sin resultados para "{searchQuery}"</p>
                <p className="text-[13px] mt-1">Intenta con otro término o categoría</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filtered.map((item) => (
                  <MenuCard
                    key={item.id}
                    item={item}
                    onSelect={(selected) => setSelectedItem(selected)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Modal Detalle */}
      <ItemDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </>
  );
}
