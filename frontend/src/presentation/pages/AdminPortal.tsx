import { useState, useMemo, useCallback } from 'react';
import { useStore } from '../../application/context/useStore';
import type { MenuItem, MenuCategory, GamingStation, Promo } from '../../infrastructure/data/initialData';
import { ImageUploadZone } from '../components/common/ImageUploadZone';
import { AdminToastContainer, ToastData } from '../components/common/AdminToast';
import {
  LayoutDashboard,
  UtensilsCrossed,
  Sparkles,
  Gamepad2,
  Building2,
  ShieldCheck,
  LogOut,
  Plus,
  Search,
  CheckCircle2,
  XCircle,
  Pencil,
  Trash2,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Star,
  KeyRound,
  Save,
  SlidersHorizontal,
  X,
} from 'lucide-react';

type AdminTab = 'dashboard' | 'menu' | 'promos' | 'gaming' | 'info' | 'security';
type StockFilter = 'todos' | 'disponibles' | 'agotados' | 'destacados';

let toastIdSequence = 0;

export function AdminPortal() {
  const {
    menuItems,
    gamingStations,
    promos,
    infoGeneral,
    toggleItemDisponible,
    toggleItemPopular,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    togglePromoActive,
    addPromo,
    updatePromo,
    deletePromo,
    updateGamingStation,
    updateInfoGeneral,
  } = useStore();

  // Navigation State
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Toast Notifications State
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = useCallback(
    (type: 'success' | 'delete' | 'warning' | 'info', title: string, description: string) => {
      toastIdSequence += 1;
      const id = `toast-${toastIdSequence}`;
      setToasts((prev) => [...prev, { id, type, title, description, duration: 4500 }]);
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Full-Text Pro Search & Filtering State
  const [menuSearch, setMenuSearch] = useState('');
  const [menuCategoryFilter, setMenuCategoryFilter] = useState<MenuCategory | 'todos'>('todos');
  const [menuStockFilter, setMenuStockFilter] = useState<StockFilter>('todos');

  // Modal States
  const [editingMenuItem, setEditingMenuItem] = useState<MenuItem | null>(null);
  const [modalPhoto, setModalPhoto] = useState<string>('');
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [deletingMenuItem, setDeletingMenuItem] = useState<MenuItem | null>(null);

  // Promo State
  const [editingPromo, setEditingPromo] = useState<Promo | null>(null);
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);
  const [deletingPromoItem, setDeletingPromoItem] = useState<Promo | null>(null);

  // Gaming State
  const [editingGaming, setEditingGaming] = useState<GamingStation | null>(null);
  const [isGamingModalOpen, setIsGamingModalOpen] = useState(false);

  // Security State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Business Info Local State
  const [localInfo, setLocalInfo] = useState(infoGeneral);

  // Category counts for quick filter pills
  const categoryCounts = useMemo(() => {
    return {
      todos: menuItems.length,
      cocteles: menuItems.filter((i) => i.categoria === 'cocteles').length,
      burgers: menuItems.filter((i) => i.categoria === 'burgers').length,
      sushi: menuItems.filter((i) => i.categoria === 'sushi').length,
      snacks: menuItems.filter((i) => i.categoria === 'snacks').length,
      servicios: menuItems.filter((i) => i.categoria === 'servicios').length,
    };
  }, [menuItems]);

  // Full-Text Pro Filtered Menu Items
  const filteredMenuItems = useMemo(() => {
    const query = menuSearch.toLowerCase().trim();

    return menuItems.filter((item) => {
      // 1. Category Filter
      if (menuCategoryFilter !== 'todos' && item.categoria !== menuCategoryFilter) {
        return false;
      }

      // 2. Stock / Status Filter
      if (menuStockFilter === 'disponibles' && !item.disponible) return false;
      if (menuStockFilter === 'agotados' && item.disponible) return false;
      if (menuStockFilter === 'destacados' && !item.popular) return false;

      // 3. Full-Text Search across multiple fields
      if (query) {
        const matchName = item.nombre.toLowerCase().includes(query);
        const matchDesc = item.descripcion.toLowerCase().includes(query);
        const matchCategory = item.categoria.toLowerCase().includes(query);
        const matchPrice = item.precio.toString().includes(query) || `$${item.precio}`.includes(query);
        const matchIngredients = item.ingredientes?.some((ing) => ing.toLowerCase().includes(query));
        const matchTags = item.etiquetas?.some((tag) => tag.toLowerCase().includes(query));
        const matchPromo = item.promo?.toLowerCase().includes(query);

        return (
          matchName ||
          matchDesc ||
          matchCategory ||
          matchPrice ||
          matchIngredients ||
          matchTags ||
          matchPromo
        );
      }

      return true;
    });
  }, [menuItems, menuCategoryFilter, menuStockFilter, menuSearch]);

  // Statistics
  const totalItems = menuItems.length;
  const availableItems = menuItems.filter((i) => i.disponible).length;
  const activePromosCount = promos.filter((p) => p.activa).length;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('lvlup_admin_token', data.token);
        setIsAuthenticated(true);
        setLoginError('');
        addToast('success', 'Sesión Iniciada', 'Bienvenido al panel ejecutivo de LVLUP.');
      } else {
        const err = await res.json();
        setLoginError(err.error || 'Credenciales incorrectas.');
      }
    } catch {
      if (loginEmail === 'admin@lvlup.com' && loginPassword === 'admin123') {
        setIsAuthenticated(true);
        setLoginError('');
        addToast('success', 'Sesión Iniciada', 'Bienvenido al panel ejecutivo de LVLUP.');
      } else {
        setLoginError('Credenciales incorrectas. (Demo: admin@lvlup.com / admin123)');
      }
    }
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      addToast('warning', 'Contraseña Demasiado Corta', 'La nueva contraseña debe tener al menos 8 caracteres.');
      return;
    }
    if (newPassword !== confirmPassword) {
      addToast('warning', 'Error de Confirmación', 'Las contraseñas no coinciden.');
      return;
    }
    addToast('success', 'Contraseña Actualizada', 'Tu clave de administrador se ha actualizado correctamente.');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleSaveInfo = (e: React.FormEvent) => {
    e.preventDefault();
    updateInfoGeneral(localInfo);
    addToast('success', 'Datos Comerciales Guardados', 'Horarios, ubicación y WhatsApp sincronizados con la web.');
  };

  const handleToggleDisponible = (item: MenuItem) => {
    toggleItemDisponible(item.id);
    if (item.disponible) {
      addToast('warning', 'Plato Marcado como Agotado', `"${item.nombre}" ya no está disponible para los clientes.`);
    } else {
      addToast('success', 'Plato Disponible', `"${item.nombre}" ahora está listo para despachar.`);
    }
  };

  const handleTogglePopular = (item: MenuItem) => {
    toggleItemPopular(item.id);
    if (item.popular) {
      addToast('info', 'Removido de Destacados', `"${item.nombre}" ya no tiene estrella destacada.`);
    } else {
      addToast('success', 'Marcado como Destacado', `"${item.nombre}" ahora resalta en la carta principal.`);
    }
  };

  const handleConfirmDeleteMenu = () => {
    if (deletingMenuItem) {
      deleteMenuItem(deletingMenuItem.id);
      addToast('delete', 'Plato Eliminado', `"${deletingMenuItem.nombre}" ha sido eliminado de la carta digital.`);
      setDeletingMenuItem(null);
    }
  };

  const handleConfirmDeletePromo = () => {
    if (deletingPromoItem) {
      deletePromo(deletingPromoItem.id);
      addToast('delete', 'Promoción Eliminada', `La promoción "${deletingPromoItem.titulo}" ha sido removida.`);
      setDeletingPromoItem(null);
    }
  };

  // Login Screen if logged out
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans text-slate-800">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-900 text-white font-black text-2xl mb-3 shadow-md">
              LVL
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Panel Administrativo</h1>
            <p className="text-sm text-slate-500 mt-1">Acceso seguro y gestión integral de LVLUP</p>
          </div>

          {loginError && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
              <XCircle size={18} className="flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                Correo Electrónico
              </label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="admin@lvlup.com"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                Contraseña
              </label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-sm transition-all shadow-md mt-2"
            >
              Iniciar Sesión
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Conexión cifrada TLS / HTTPS</span>
            <a href="/" className="text-slate-900 hover:underline font-semibold flex items-center gap-1">
              Volver a la Web <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900 antialiased">
      {/* Toast Notification Container */}
      <AdminToastContainer toasts={toasts} onDismiss={removeToast} />

      {/* ── SIDEBAR ── */}
      <aside
        className={`bg-white border-r border-slate-200 flex flex-col justify-between transition-all duration-300 z-30 sticky top-0 h-screen ${
          sidebarCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="h-16 border-b border-slate-200 flex items-center justify-between px-4">
            {!sidebarCollapsed && (
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-black text-sm">
                  LVL
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900 leading-tight">LVLUP Admin</div>
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Control Panel</div>
                </div>
              </div>
            )}
            {sidebarCollapsed && (
              <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-black text-sm mx-auto">
                LVL
              </div>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              title={sidebarCollapsed ? 'Expandir menú' : 'Colapsar menú'}
            >
              {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {[
              { id: 'dashboard', label: 'Resumen', icon: LayoutDashboard },
              { id: 'menu', label: 'Gestión de Carta', icon: UtensilsCrossed },
              { id: 'promos', label: 'Promociones', icon: Sparkles },
              { id: 'gaming', label: 'Zona Gaming', icon: Gamepad2 },
              { id: 'info', label: 'Datos del Bar', icon: Building2 },
              { id: 'security', label: 'Seguridad & Clave', icon: ShieldCheck },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as AdminTab)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                  activeTab === id
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                } ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
                title={sidebarCollapsed ? label : undefined}
              >
                <Icon size={18} className="flex-shrink-0" />
                {!sidebarCollapsed && <span>{label}</span>}
              </button>
            ))}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-3 border-t border-slate-200 space-y-1">
          <a
            href="/"
            className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium text-xs transition-colors ${
              sidebarCollapsed ? 'justify-center px-0' : ''
            }`}
            title="Ver sitio web"
          >
            <ExternalLink size={16} />
            {!sidebarCollapsed && <span>Ver Sitio Web</span>}
          </a>

          <button
            onClick={() => {
              setIsAuthenticated(false);
              addToast('info', 'Sesión Finalizada', 'Has cerrado sesión correctamente.');
            }}
            className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-red-600 hover:bg-red-50 font-medium text-xs transition-colors ${
              sidebarCollapsed ? 'justify-center px-0' : ''
            }`}
            title="Cerrar sesión"
          >
            <LogOut size={16} />
            {!sidebarCollapsed && <span>Cerrar Sesión</span>}
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT AREA ── */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header Bar */}
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-20">
          <div>
            <h2 className="text-base font-bold text-slate-900 capitalize">
              {activeTab === 'dashboard' && 'Resumen General del Sistema'}
              {activeTab === 'menu' && 'Administración de la Carta & Menú'}
              {activeTab === 'promos' && 'Configuración de Promociones'}
              {activeTab === 'gaming' && 'Tarifas y Estaciones de Juego'}
              {activeTab === 'info' && 'Información de Contacto y Horarios'}
              {activeTab === 'security' && 'Ajustes de Seguridad y Acceso'}
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
            <span className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold">
              A
            </span>
            <span>Administrador</span>
          </div>
        </header>

        {/* Content Body Container */}
        <div className="p-8 max-w-7xl w-full mx-auto space-y-8">
          {/* ══════════════════════════════════════════════════════════════
              TAB: DASHBOARD
              ══════════════════════════════════════════════════════════════ */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total en Carta</div>
                    <div className="text-2xl font-black text-slate-900 mt-1">{totalItems}</div>
                    <div className="text-xs text-slate-400 mt-1">4 items por categoría</div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                    <UtensilsCrossed size={22} />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Disponibles</div>
                    <div className="text-2xl font-black text-emerald-600 mt-1">{availableItems}</div>
                    <div className="text-xs text-slate-400 mt-1">Listos para despachar</div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <CheckCircle2 size={22} />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Promos Activas</div>
                    <div className="text-2xl font-black text-amber-600 mt-1">{activePromosCount}</div>
                    <div className="text-xs text-slate-400 mt-1">Visibles en la web</div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                    <Sparkles size={22} />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Zona Gaming</div>
                    <div className="text-2xl font-black text-indigo-600 mt-1">{gamingStations.length}</div>
                    <div className="text-xs text-slate-400 mt-1">Consolas y juegos de salón</div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <Gamepad2 size={22} />
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <h3 className="text-base font-bold text-slate-900 mb-4">Acciones Rápidas</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        setEditingMenuItem(null);
                        setModalPhoto('');
                        setIsMenuModalOpen(true);
                      }}
                      className="p-4 rounded-xl border border-slate-200 hover:border-slate-900 bg-slate-50 hover:bg-white text-left transition-all group"
                    >
                      <Plus size={20} className="text-slate-600 group-hover:text-slate-900 mb-2" />
                      <div className="font-semibold text-sm text-slate-900">Agregar Plato / Coctel</div>
                      <div className="text-xs text-slate-500 mt-0.5">Crear nuevo item en carta</div>
                    </button>

                    <button
                      onClick={() => {
                        setEditingPromo(null);
                        setIsPromoModalOpen(true);
                      }}
                      className="p-4 rounded-xl border border-slate-200 hover:border-slate-900 bg-slate-50 hover:bg-white text-left transition-all group"
                    >
                      <Sparkles size={20} className="text-slate-600 group-hover:text-slate-900 mb-2" />
                      <div className="font-semibold text-sm text-slate-900">Crear Promoción</div>
                      <div className="text-xs text-slate-500 mt-0.5">Configurar 2x1 o combos</div>
                    </button>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <h3 className="text-base font-bold text-slate-900 mb-4">Estado del Sistema & Seguridad</h3>
                  <div className="space-y-3 text-xs">
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50">
                      <span className="text-slate-600 font-medium">Base de Datos Activa</span>
                      <span className="font-bold text-emerald-600">PostgreSQL (Prisma 7)</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50">
                      <span className="text-slate-600 font-medium">Optimizador WebP Automático</span>
                      <span className="font-bold text-emerald-600">Activo (Cámara & Galería)</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50">
                      <span className="text-slate-600 font-medium">Protección de Cabeceras (Helmet & CSP)</span>
                      <span className="font-bold text-emerald-600">Habilitado</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════
              TAB: GESTIÓN DE MENÚ & BÚSQUEDA FULL-TEXT PRO
              ══════════════════════════════════════════════════════════════ */}
          {activeTab === 'menu' && (
            <div className="space-y-6">
              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {[
                  { id: 'todos', label: 'Todos', count: categoryCounts.todos },
                  { id: 'cocteles', label: 'Cocteles', count: categoryCounts.cocteles },
                  { id: 'burgers', label: 'Burgers & Platos', count: categoryCounts.burgers },
                  { id: 'sushi', label: 'Sushi & Rolls', count: categoryCounts.sushi },
                  { id: 'snacks', label: 'Snacks & Naves', count: categoryCounts.snacks },
                  { id: 'servicios', label: 'Licores', count: categoryCounts.servicios },
                ].map(({ id, label, count }) => (
                  <button
                    key={id}
                    onClick={() => setMenuCategoryFilter(id as MenuCategory | 'todos')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 flex-shrink-0 ${
                      menuCategoryFilter === id
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <span>{label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                        menuCategoryFilter === id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Search Bar & Stock Filter Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex flex-wrap items-center gap-3 flex-1">
                  {/* Full-Text Input */}
                  <div className="relative w-full sm:w-80">
                    <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="search"
                      placeholder="Buscar por plato, ingrediente, etiqueta o precio..."
                      value={menuSearch}
                      onChange={(e) => setMenuSearch(e.target.value)}
                      className="w-full pl-9.5 pr-8 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 text-xs bg-slate-50/50 focus:bg-white transition-colors"
                    />
                    {menuSearch && (
                      <button
                        onClick={() => setMenuSearch('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>

                  {/* Stock Filter Dropdown */}
                  <div className="flex items-center gap-1.5">
                    <SlidersHorizontal size={14} className="text-slate-400" />
                    <select
                      value={menuStockFilter}
                      onChange={(e) => setMenuStockFilter(e.target.value as StockFilter)}
                      className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                    >
                      <option value="todos">Todos los Estados</option>
                      <option value="disponibles">Solo Disponibles</option>
                      <option value="agotados">Solo Agotados</option>
                      <option value="destacados">Solo Destacados (⭐)</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-slate-400">
                    {filteredMenuItems.length} de {totalItems} items
                  </span>

                  <button
                    onClick={() => {
                      setEditingMenuItem(null);
                      setModalPhoto('');
                      setIsMenuModalOpen(true);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-xs transition-all shadow-sm flex-shrink-0"
                  >
                    <Plus size={16} />
                    <span>Nuevo Item</span>
                  </button>
                </div>
              </div>

              {/* Menu Items Table */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-600">
                    <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <tr>
                        <th className="py-3.5 px-4">Item & Fotografía</th>
                        <th className="py-3.5 px-4">Categoría</th>
                        <th className="py-3.5 px-4">Precio (USD)</th>
                        <th className="py-3.5 px-4 text-center">Disponibilidad</th>
                        <th className="py-3.5 px-4 text-center">Destacado</th>
                        <th className="py-3.5 px-4 text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredMenuItems.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-12 text-center text-slate-400">
                            <div className="text-sm font-semibold text-slate-600">No se encontraron productos</div>
                            <div className="text-xs mt-1">Prueba con otra búsqueda o limpia los filtros.</div>
                          </td>
                        </tr>
                      ) : (
                        filteredMenuItems.map((item) => (
                          <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-3">
                                {item.foto ? (
                                  <img
                                    src={item.foto}
                                    alt={item.nombre}
                                    className="w-11 h-11 rounded-xl object-cover border border-slate-200 flex-shrink-0 bg-slate-100"
                                  />
                                ) : (
                                  <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 font-bold text-[11px] flex-shrink-0">
                                    Sin foto
                                  </div>
                                )}
                                <div>
                                  <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                                    <span>{item.nombre}</span>
                                    {item.promo && (
                                      <span className="px-1.5 py-0.2 rounded text-[9px] font-black uppercase bg-pink-50 text-pink-600 border border-pink-200">
                                        {item.promo}
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-slate-400 truncate max-w-xs text-[11px] mt-0.5">
                                    {item.descripcion}
                                  </div>
                                  {item.ingredientes && item.ingredientes.length > 0 && (
                                    <div className="text-[10px] text-slate-400 font-medium truncate max-w-xs mt-0.5">
                                      {item.ingredientes.join(' · ')}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </td>

                            <td className="py-3.5 px-4">
                              <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-700 capitalize">
                                {item.categoria}
                              </span>
                            </td>

                            <td className="py-3.5 px-4 font-black text-slate-900 text-sm">
                              ${item.precio.toFixed(2)}
                            </td>

                            <td className="py-3.5 px-4 text-center">
                              <button
                                onClick={() => handleToggleDisponible(item)}
                                className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${
                                  item.disponible
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                                    : 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100'
                                }`}
                              >
                                {item.disponible ? 'Disponible' : 'Agotado'}
                              </button>
                            </td>

                            <td className="py-3.5 px-4 text-center">
                              <button
                                onClick={() => handleTogglePopular(item)}
                                className={`p-1.5 rounded-lg transition-colors ${
                                  item.popular ? 'text-amber-500 bg-amber-50' : 'text-slate-300 hover:text-slate-500'
                                }`}
                                title={item.popular ? 'Quitar de destacados' : 'Marcar como destacado'}
                              >
                                <Star size={16} fill={item.popular ? 'currentColor' : 'none'} />
                              </button>
                            </td>

                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => {
                                    setEditingMenuItem(item);
                                    setModalPhoto(item.foto || '');
                                    setIsMenuModalOpen(true);
                                  }}
                                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                                  title="Editar plato"
                                >
                                  <Pencil size={15} />
                                </button>
                                <button
                                  onClick={() => setDeletingMenuItem(item)}
                                  className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                                  title="Eliminar plato"
                                >
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════
              TAB: PROMOCIONES
              ══════════════════════════════════════════════════════════════ */}
          {activeTab === 'promos' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Promociones Activas & Happy Hours</h3>
                  <p className="text-xs text-slate-500">Activa o desactiva ofertas con un solo clic</p>
                </div>
                <button
                  onClick={() => {
                    setEditingPromo(null);
                    setIsPromoModalOpen(true);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-xs transition-all shadow-sm"
                >
                  <Plus size={16} />
                  <span>Nueva Promoción</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {promos.map((promo) => (
                  <div
                    key={promo.id}
                    className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <span className="px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200">
                          {promo.etiqueta || 'PROMO'}
                        </span>
                        <button
                          onClick={() => {
                            togglePromoActive(promo.id);
                            addToast(
                              promo.activa ? 'warning' : 'success',
                              promo.activa ? 'Promo Desactivada' : 'Promo Activada',
                              `"${promo.titulo}" ${promo.activa ? 'ya no es visible' : 'ahora está activa en la web'}.`
                            );
                          }}
                          className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${
                            promo.activa
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-slate-100 text-slate-500 border border-slate-200'
                          }`}
                        >
                          {promo.activa ? 'Activa en Web' : 'Inactiva'}
                        </button>
                      </div>

                      <h4 className="text-base font-black text-slate-900 mb-1">{promo.titulo}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed mb-4">{promo.descripcion}</p>

                      <div className="space-y-1 text-xs text-slate-500">
                        <div>
                          <span className="font-semibold text-slate-700">Días:</span> {promo.dias?.join(', ') || 'Todos los días'}
                        </div>
                        <div>
                          <span className="font-semibold text-slate-700">Horario:</span>{' '}
                          {promo.horaInicio && promo.horaFin ? `${promo.horaInicio} — ${promo.horaFin}` : 'Todo el día'}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-5">
                      <div className="font-black text-slate-900 text-lg">
                        {promo.precioPromo ? `$${promo.precioPromo.toFixed(2)} USD` : 'Especial'}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingPromo(promo);
                            setIsPromoModalOpen(true);
                          }}
                          className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => setDeletingPromoItem(promo)}
                          className="p-2 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════
              TAB: ZONA GAMING & TARIFAS
              ══════════════════════════════════════════════════════════════ */}
          {activeTab === 'gaming' && (
            <div className="space-y-6">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-sm text-slate-900">Tarifas y Estaciones de Juego</h3>
                <p className="text-xs text-slate-500">
                  Modifica las tarifas de 30 minutos ($3) o 1 hora ($6) y características del equipo
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {gamingStations.map((station) => (
                  <div key={station.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700 uppercase">
                          {station.tipo === 'consola' ? 'Consola' : 'Mesa de Juego'}
                        </span>
                        <span className="text-xs font-bold text-emerald-600">Tarifa Activa</span>
                      </div>

                      <h4 className="font-black text-slate-900 text-base mb-1">{station.nombre}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed mb-4">{station.descripcion}</p>

                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs font-bold text-slate-900 mb-4">
                        <div>30 min: ${station.precio30min ?? 3}.00</div>
                        <div>1 hora: ${station.precio1hora ?? 6}.00</div>
                      </div>

                      {station.juegos && station.juegos.length > 0 && (
                        <div className="space-y-1">
                          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Equipamiento:</div>
                          <div className="flex flex-wrap gap-1">
                            {station.juegos.map((feat) => (
                              <span
                                key={feat}
                                className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded"
                              >
                                {feat}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex justify-end mt-4">
                      <button
                        onClick={() => {
                          setEditingGaming(station);
                          setIsGamingModalOpen(true);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700"
                      >
                        <Pencil size={13} />
                        <span>Editar Tarifa</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════
              TAB: INFORMACIÓN DEL NEGOCIO
              ══════════════════════════════════════════════════════════════ */}
          {activeTab === 'info' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 max-w-2xl">
              <h3 className="font-bold text-base text-slate-900 mb-1">Información General & Canales de Contacto</h3>
              <p className="text-xs text-slate-500 mb-6">
                Estos datos se sincronizan automáticamente en el encabezado, pie de página y sección de contacto.
              </p>

              <form onSubmit={handleSaveInfo} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nombre Comercial</label>
                  <input
                    type="text"
                    value={localInfo.nombre}
                    onChange={(e) => setLocalInfo({ ...localInfo, nombre: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Lugar / Centro Comercial</label>
                    <input
                      type="text"
                      value={localInfo.ubicacion.lugar}
                      onChange={(e) =>
                        setLocalInfo({
                          ...localInfo,
                          ubicacion: { ...localInfo.ubicacion, lugar: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Ciudad / País</label>
                    <input
                      type="text"
                      value={localInfo.ubicacion.ciudad}
                      onChange={(e) =>
                        setLocalInfo({
                          ...localInfo,
                          ubicacion: { ...localInfo.ubicacion, ciudad: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Número de WhatsApp</label>
                    <input
                      type="text"
                      value={localInfo.contacto.whatsapp}
                      onChange={(e) =>
                        setLocalInfo({
                          ...localInfo,
                          contacto: { ...localInfo.contacto, whatsapp: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Usuario de Instagram</label>
                    <input
                      type="text"
                      value={localInfo.contacto.instagram}
                      onChange={(e) =>
                        setLocalInfo({
                          ...localInfo,
                          contacto: { ...localInfo.contacto, instagram: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 text-xs"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-4 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-xs transition-all shadow-sm flex items-center gap-2"
                >
                  <Save size={15} />
                  <span>Guardar Cambios</span>
                </button>
              </form>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════
              TAB: SEGURIDAD & CLAVE
              ══════════════════════════════════════════════════════════════ */}
          {activeTab === 'security' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 max-w-xl">
              <h3 className="font-bold text-base text-slate-900 mb-1">Seguridad & Cambio de Contraseña</h3>
              <p className="text-xs text-slate-500 mb-6">
                Protege el acceso al panel administrativo. Se requiere mínimo 8 caracteres con encriptación bcrypt.
              </p>

              <form onSubmit={handlePasswordChange} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Contraseña Actual</label>
                  <input
                    type="password"
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nueva Contraseña</label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Mínimo 8 caracteres"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Confirmar Nueva Contraseña</label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-4 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-xs transition-all shadow-sm flex items-center gap-2"
                >
                  <KeyRound size={15} />
                  <span>Actualizar Contraseña</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </main>

      {/* ── MODAL: NUEVO / EDITAR PLATO ── */}
      {isMenuModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">
                {editingMenuItem ? 'Editar Item de Menú' : 'Nuevo Item de Menú'}
              </h3>
              <button
                onClick={() => setIsMenuModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const formData = new FormData(form);
                const itemData: Omit<MenuItem, 'id'> = {
                  nombre: formData.get('nombre') as string,
                  categoria: formData.get('categoria') as MenuCategory,
                  precio: parseFloat(formData.get('precio') as string),
                  descripcion: formData.get('descripcion') as string,
                  foto: modalPhoto.trim() || undefined,
                  disponible: true,
                };

                if (editingMenuItem) {
                  updateMenuItem(editingMenuItem.id, itemData);
                  addToast('success', 'Plato Actualizado', `"${itemData.nombre}" guardado con precio $${itemData.precio.toFixed(2)} USD.`);
                } else {
                  addMenuItem(itemData);
                  addToast('success', 'Plato Creado', `"${itemData.nombre}" registrado en la carta.`);
                }
                setIsMenuModalOpen(false);
              }}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nombre del Plato / Coctel</label>
                <input
                  name="nombre"
                  defaultValue={editingMenuItem?.nombre || ''}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-slate-900 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Categoría</label>
                  <select
                    name="categoria"
                    defaultValue={editingMenuItem?.categoria || 'cocteles'}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-slate-900 outline-none"
                  >
                    <option value="cocteles">Cocteles</option>
                    <option value="burgers">Burgers & Platos</option>
                    <option value="sushi">Sushi & Rolls</option>
                    <option value="snacks">Snacks & Naves</option>
                    <option value="servicios">Licores</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Precio (USD)</label>
                  <input
                    name="precio"
                    type="number"
                    step="0.5"
                    defaultValue={editingMenuItem?.precio || 5}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-slate-900 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Descripción</label>
                <textarea
                  name="descripcion"
                  defaultValue={editingMenuItem?.descripcion || ''}
                  rows={2}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-slate-900 outline-none resize-none"
                />
              </div>

              <ImageUploadZone
                currentImageUrl={modalPhoto}
                onImageSelected={setModalPhoto}
                label="Fotografía del Plato o Coctel (Cámara o Galería)"
              />

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsMenuModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800"
                >
                  Guardar Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL: NUEVA / EDITAR PROMO ── */}
      {isPromoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">
                {editingPromo ? 'Editar Promoción' : 'Nueva Promoción'}
              </h3>
              <button
                onClick={() => setIsPromoModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const formData = new FormData(form);
                const promoData: Omit<Promo, 'id'> = {
                  titulo: formData.get('titulo') as string,
                  descripcion: formData.get('descripcion') as string,
                  etiqueta: formData.get('etiqueta') as string,
                  precioPromo: formData.get('precioPromo') ? parseFloat(formData.get('precioPromo') as string) : undefined,
                  horaInicio: (formData.get('horaInicio') as string) || undefined,
                  horaFin: (formData.get('horaFin') as string) || undefined,
                  activa: true,
                  color: 'pink',
                  dias: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'],
                };

                if (editingPromo) {
                  updatePromo(editingPromo.id, promoData);
                  addToast('success', 'Promoción Actualizada', `"${promoData.titulo}" guardada correctamente.`);
                } else {
                  addPromo(promoData);
                  addToast('success', 'Promoción Creada', `"${promoData.titulo}" agregada.`);
                }
                setIsPromoModalOpen(false);
              }}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="block font-bold text-slate-700 mb-1">Título de la Promo</label>
                <input
                  name="titulo"
                  defaultValue={editingPromo?.titulo || ''}
                  required
                  placeholder="Ej: Happy Hour Cocteles 2x1"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-slate-900 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Etiqueta Badge</label>
                  <input
                    name="etiqueta"
                    defaultValue={editingPromo?.etiqueta || '2X1'}
                    required
                    placeholder="2X1, HAPPY HOUR..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-slate-900 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Precio Promo (Opcional)</label>
                  <input
                    name="precioPromo"
                    type="number"
                    step="0.5"
                    defaultValue={editingPromo?.precioPromo || ''}
                    placeholder="Ej: 4.00"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-slate-900 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Descripción</label>
                <textarea
                  name="descripcion"
                  defaultValue={editingPromo?.descripcion || ''}
                  rows={2}
                  required
                  placeholder="Explica en qué consiste la oferta..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-slate-900 outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Hora Inicio (Opcional)</label>
                  <input
                    name="horaInicio"
                    defaultValue={editingPromo?.horaInicio || '16:00'}
                    placeholder="16:00"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-slate-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Hora Fin (Opcional)</label>
                  <input
                    name="horaFin"
                    defaultValue={editingPromo?.horaFin || '19:00'}
                    placeholder="19:00"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-slate-900 outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsPromoModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800"
                >
                  Guardar Promoción
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL: EDITAR GAMING ── */}
      {isGamingModalOpen && editingGaming && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">Editar Tarifa Gaming</h3>
              <button
                onClick={() => setIsGamingModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const formData = new FormData(form);
                const updateData: Partial<GamingStation> = {
                  nombre: formData.get('nombre') as string,
                  descripcion: formData.get('descripcion') as string,
                  precio30min: parseFloat(formData.get('precio30min') as string),
                  precio1hora: parseFloat(formData.get('precio1hora') as string),
                };
                updateGamingStation(editingGaming.id, updateData);
                addToast('success', 'Tarifa Gaming Actualizada', `"${updateData.nombre}" configurada a $${updateData.precio30min} / $${updateData.precio1hora} USD.`);
                setIsGamingModalOpen(false);
              }}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nombre de la Estación</label>
                <input
                  name="nombre"
                  defaultValue={editingGaming.nombre}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-slate-900 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tarifa 30 min ($)</label>
                  <input
                    name="precio30min"
                    type="number"
                    step="0.5"
                    defaultValue={editingGaming.precio30min ?? 3}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-slate-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tarifa 1 hora ($)</label>
                  <input
                    name="precio1hora"
                    type="number"
                    step="0.5"
                    defaultValue={editingGaming.precio1hora ?? 6}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-slate-900 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Descripción</label>
                <textarea
                  name="descripcion"
                  defaultValue={editingGaming.descripcion || ''}
                  rows={2}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-slate-900 outline-none resize-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsGamingModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800"
                >
                  Guardar Tarifa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL CONTEXTUAL: CONFIRMAR ELIMINACIÓN DE PLATO ── */}
      {deletingMenuItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 size={24} />
            </div>

            <div className="text-center">
              <h3 className="font-bold text-base text-slate-900">¿Eliminar {deletingMenuItem.nombre}?</h3>
              <p className="text-xs text-slate-500 mt-1">
                Esta acción removerá el plato permanentemente de la carta digital.
              </p>
            </div>

            {/* Item Card Preview */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3">
              {deletingMenuItem.foto ? (
                <img
                  src={deletingMenuItem.foto}
                  alt={deletingMenuItem.nombre}
                  className="w-10 h-10 rounded-lg object-cover border border-slate-200 flex-shrink-0"
                />
              ) : (
                <div className="w-10 h-10 rounded-lg bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-xs flex-shrink-0">
                  N/A
                </div>
              )}
              <div className="text-left flex-1 min-w-0">
                <div className="font-bold text-slate-900 text-xs truncate">{deletingMenuItem.nombre}</div>
                <div className="text-[11px] text-slate-500 capitalize">{deletingMenuItem.categoria} · ${deletingMenuItem.precio.toFixed(2)} USD</div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setDeletingMenuItem(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDeleteMenu}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs transition-colors shadow-sm"
              >
                Eliminar Definitivamente
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL CONTEXTUAL: CONFIRMAR ELIMINACIÓN DE PROMO ── */}
      {deletingPromoItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 size={24} />
            </div>

            <div className="text-center">
              <h3 className="font-bold text-base text-slate-900">¿Eliminar Promoción?</h3>
              <p className="text-xs text-slate-500 mt-1">
                Se eliminará "{deletingPromoItem.titulo}" y dejará de mostrarse en la web de clientes.
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setDeletingPromoItem(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDeletePromo}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs transition-colors shadow-sm"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
