import type { MenuItem, MenuCategory, GamingStation, Promo, InfoGeneral } from '../data/initialData';

const API_BASE_URL = '/api';

let cachedToken: string | null = null;

async function getAuthHeaders(): Promise<HeadersInit> {
  // 1. Obtener token de localStorage o memoria
  let token = cachedToken || localStorage.getItem('lvlup_admin_token');

  // 2. Si no hay token, autenticar automáticamente en segundo plano
  if (!token) {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'admin@lvlup.com', password: 'admin123' }),
      });
      if (res.ok) {
        const data = await res.json();
        token = data.token;
        cachedToken = data.token;
        if (token) localStorage.setItem('lvlup_admin_token', token);
      }
    } catch {
      // fallback
    }
  }

  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

interface ApiMenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  photoUrl?: string;
  isAvailable: boolean;
  isPopular: boolean;
  promoTag?: string;
  tags?: string[];
  ingredients?: string[];
}

interface ApiPromo {
  id: string;
  title: string;
  description: string;
  tag?: string;
  days?: string[];
  startTime?: string;
  endTime?: string;
  isActive: boolean;
  color?: 'pink' | 'cyan' | 'purple';
  promoPrice?: number;
}

interface ApiGaming {
  id: string;
  name: string;
  type: string;
  price30min?: number;
  price1hour?: number;
  description?: string;
  features?: string[];
  isAvailable: boolean;
}

interface ApiBusiness {
  name: string;
  slogan: string;
  address: string;
  whatsapp: string;
  instagram: string;
  hoursJson?: Record<string, string>;
}

export const apiClient = {
  // ── MENU ──
  async getMenu(): Promise<MenuItem[] | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/menu`);
      if (!res.ok) return null;
      const data: ApiMenuItem[] = await res.json();
      return data.map((item) => ({
        id: item.id,
        nombre: item.name,
        descripcion: item.description || '',
        precio: Number(item.price),
        categoria: item.category.toLowerCase() as MenuCategory,
        foto: item.photoUrl || undefined,
        disponible: item.isAvailable,
        popular: item.isPopular,
        promo: item.promoTag || undefined,
        etiquetas: item.tags || [],
        ingredientes: item.ingredients || [],
      }));
    } catch {
      return null;
    }
  },

  async createMenuItem(item: Omit<MenuItem, 'id'> & { id?: string }): Promise<boolean> {
    try {
      const headers = await getAuthHeaders();
      const payload = {
        name: item.nombre,
        description: item.descripcion,
        price: item.precio,
        category: item.categoria.toUpperCase(),
        photoUrl: item.foto,
        isAvailable: item.disponible ?? true,
        isPopular: item.popular ?? false,
        promoTag: item.promo,
        tags: item.etiquetas || [],
        ingredients: item.ingredientes || [],
      };
      const res = await fetch(`${API_BASE_URL}/menu`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  async updateMenuItem(id: string, item: Partial<MenuItem>): Promise<boolean> {
    try {
      const headers = await getAuthHeaders();
      const payload: Record<string, unknown> = {};
      if (item.nombre !== undefined) payload.name = item.nombre;
      if (item.descripcion !== undefined) payload.description = item.descripcion;
      if (item.precio !== undefined) payload.price = item.precio;
      if (item.categoria !== undefined) payload.category = item.categoria.toUpperCase();
      if (item.foto !== undefined) payload.photoUrl = item.foto;
      if (item.disponible !== undefined) payload.isAvailable = item.disponible;
      if (item.popular !== undefined) payload.isPopular = item.popular;
      if (item.promo !== undefined) payload.promoTag = item.promo;
      if (item.etiquetas !== undefined) payload.tags = item.etiquetas;
      if (item.ingredientes !== undefined) payload.ingredients = item.ingredientes;

      const res = await fetch(`${API_BASE_URL}/menu/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(payload),
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  async deleteMenuItem(id: string): Promise<boolean> {
    try {
      const headers = await getAuthHeaders();
      const res = await fetch(`${API_BASE_URL}/menu/${id}`, {
        method: 'DELETE',
        headers,
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  async toggleItemDisponible(id: string): Promise<boolean> {
    try {
      const headers = await getAuthHeaders();
      const res = await fetch(`${API_BASE_URL}/menu/${id}/toggle-available`, {
        method: 'PATCH',
        headers,
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  async toggleItemPopular(id: string): Promise<boolean> {
    try {
      const headers = await getAuthHeaders();
      const res = await fetch(`${API_BASE_URL}/menu/${id}/toggle-popular`, {
        method: 'PATCH',
        headers,
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  // ── PROMOS ──
  async getPromos(): Promise<Promo[] | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/promos`);
      if (!res.ok) return null;
      const data: ApiPromo[] = await res.json();
      return data.map((p) => ({
        id: p.id,
        titulo: p.title,
        descripcion: p.description,
        etiqueta: p.tag || 'PROMO',
        dias: p.days || [],
        horaInicio: p.startTime || undefined,
        horaFin: p.endTime || undefined,
        activa: p.isActive,
        color: p.color || 'pink',
        precioPromo: p.promoPrice ? Number(p.promoPrice) : undefined,
      }));
    } catch {
      return null;
    }
  },

  async createPromo(promo: Omit<Promo, 'id'> & { id?: string }): Promise<boolean> {
    try {
      const headers = await getAuthHeaders();
      const payload = {
        title: promo.titulo,
        description: promo.descripcion,
        tag: promo.etiqueta,
        days: promo.dias || [],
        startTime: promo.horaInicio,
        endTime: promo.horaFin,
        isActive: promo.activa ?? true,
        color: promo.color || 'pink',
        promoPrice: promo.precioPromo,
      };
      const res = await fetch(`${API_BASE_URL}/promos`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  async updatePromo(id: string, promo: Partial<Promo>): Promise<boolean> {
    try {
      const headers = await getAuthHeaders();
      const payload: Record<string, unknown> = {};
      if (promo.titulo !== undefined) payload.title = promo.titulo;
      if (promo.descripcion !== undefined) payload.description = promo.descripcion;
      if (promo.etiqueta !== undefined) payload.tag = promo.etiqueta;
      if (promo.dias !== undefined) payload.days = promo.dias;
      if (promo.horaInicio !== undefined) payload.startTime = promo.horaInicio;
      if (promo.horaFin !== undefined) payload.endTime = promo.horaFin;
      if (promo.activa !== undefined) payload.isActive = promo.activa;
      if (promo.color !== undefined) payload.color = promo.color;
      if (promo.precioPromo !== undefined) payload.promoPrice = promo.precioPromo;

      const res = await fetch(`${API_BASE_URL}/promos/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(payload),
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  async deletePromo(id: string): Promise<boolean> {
    try {
      const headers = await getAuthHeaders();
      const res = await fetch(`${API_BASE_URL}/promos/${id}`, {
        method: 'DELETE',
        headers,
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  async togglePromoActive(id: string): Promise<boolean> {
    try {
      const headers = await getAuthHeaders();
      const res = await fetch(`${API_BASE_URL}/promos/${id}/toggle-active`, {
        method: 'PATCH',
        headers,
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  // ── GAMING ──
  async getGaming(): Promise<GamingStation[] | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/gaming`);
      if (!res.ok) return null;
      const data: ApiGaming[] = await res.json();
      return data.map((g) => ({
        id: g.id,
        nombre: g.name,
        tipo: g.type === 'CONSOLA' ? 'consola' : 'mesa',
        precio30min: Number(g.price30min) || 3,
        precio1hora: Number(g.price1hour) || 6,
        descripcion: g.description || '',
        juegos: g.features || [],
        disponible: g.isAvailable,
      }));
    } catch {
      return null;
    }
  },

  async updateGamingStation(id: string, station: Partial<GamingStation>): Promise<boolean> {
    try {
      const headers = await getAuthHeaders();
      const payload: Record<string, unknown> = {};
      if (station.nombre !== undefined) payload.name = station.nombre;
      if (station.descripcion !== undefined) payload.description = station.descripcion;
      if (station.precio30min !== undefined) payload.price30min = station.precio30min;
      if (station.precio1hora !== undefined) payload.price1hour = station.precio1hora;
      if (station.juegos !== undefined) payload.features = station.juegos;
      if (station.disponible !== undefined) payload.isAvailable = station.disponible;

      const res = await fetch(`${API_BASE_URL}/gaming/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(payload),
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  // ── BUSINESS INFO ──
  async getBusiness(): Promise<InfoGeneral | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/business`);
      if (!res.ok) return null;
      const data: ApiBusiness = await res.json();
      return {
        nombre: data.name,
        slogan: data.slogan,
        ubicacion: {
          lugar: data.address,
          ciudad: 'Valencia, Venezuela',
          mapaLat: 10.1620,
          mapaLng: -67.9940,
        },
        contacto: {
          whatsapp: data.whatsapp,
          instagram: data.instagram,
        },
        horarios: data.hoursJson || {},
      };
    } catch {
      return null;
    }
  },

  async updateBusiness(info: Partial<InfoGeneral>): Promise<boolean> {
    try {
      const headers = await getAuthHeaders();
      const payload: Record<string, unknown> = {};
      if (info.nombre !== undefined) payload.name = info.nombre;
      if (info.slogan !== undefined) payload.slogan = info.slogan;
      if (info.ubicacion?.lugar !== undefined) payload.address = info.ubicacion.lugar;
      if (info.contacto?.whatsapp !== undefined) payload.whatsapp = info.contacto.whatsapp;
      if (info.contacto?.instagram !== undefined) payload.instagram = info.contacto.instagram;
      if (info.horarios !== undefined) payload.hoursJson = info.horarios;

      const res = await fetch(`${API_BASE_URL}/business`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(payload),
      });
      return res.ok;
    } catch {
      return false;
    }
  },
};
