import { createContext } from 'react';
import type { MenuItem, GamingStation, Promo, InfoGeneral } from '../../infrastructure/data/initialData';
import {
  menuItems as initialMenuItems,
  gamingStations as initialGamingStations,
  promos as initialPromos,
  infoGeneral as initialInfoGeneral,
} from '../../infrastructure/data/initialData';

/* ──────────────────────────────────────────────
   GLOBAL STORE STATE
   ────────────────────────────────────────────── */

export interface StoreState {
  isAdminMode: boolean;
  searchQuery: string;
  activeCategory: string;
  menuItems: MenuItem[];
  gamingStations: GamingStation[];
  promos: Promo[];
  infoGeneral: InfoGeneral;
}

export type StoreAction =
  | { type: 'TOGGLE_ADMIN_MODE' }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_CATEGORY'; payload: string }
  | { type: 'HYDRATE_STORE'; payload: Partial<StoreState> }
  // Menu Actions
  | { type: 'ADD_MENU_ITEM'; payload: Omit<MenuItem, 'id'> & { id?: string } }
  | { type: 'UPDATE_MENU_ITEM'; payload: { id: string; item: Partial<MenuItem> } }
  | { type: 'DELETE_MENU_ITEM'; payload: string }
  | { type: 'UPDATE_ITEM_PRICE'; payload: { id: string; precio: number } }
  | { type: 'TOGGLE_ITEM_DISPONIBLE'; payload: string }
  | { type: 'TOGGLE_ITEM_POPULAR'; payload: string }
  // Promo Actions
  | { type: 'ADD_PROMO'; payload: Omit<Promo, 'id'> & { id?: string } }
  | { type: 'UPDATE_PROMO'; payload: { id: string; promo: Partial<Promo> } }
  | { type: 'DELETE_PROMO'; payload: string }
  | { type: 'TOGGLE_PROMO_ACTIVE'; payload: string }
  // Gaming Actions
  | { type: 'UPDATE_GAMING_STATION'; payload: { id: string; station: Partial<GamingStation> } }
  // Info Actions
  | { type: 'UPDATE_INFO_GENERAL'; payload: Partial<InfoGeneral> };

export function reducer(state: StoreState, action: StoreAction): StoreState {
  let nextState: StoreState;

  switch (action.type) {
    case 'TOGGLE_ADMIN_MODE':
      nextState = { ...state, isAdminMode: !state.isAdminMode };
      break;

    case 'SET_SEARCH':
      nextState = { ...state, searchQuery: action.payload };
      break;

    case 'SET_CATEGORY':
      nextState = { ...state, activeCategory: action.payload };
      break;

    case 'HYDRATE_STORE':
      nextState = {
        ...state,
        ...action.payload,
      };
      break;

    // ── Menu ──
    case 'ADD_MENU_ITEM': {
      const newItem: MenuItem = {
        ...action.payload,
        id: action.payload.id || `custom-${Date.now()}`,
      };
      nextState = { ...state, menuItems: [newItem, ...state.menuItems] };
      break;
    }

    case 'UPDATE_MENU_ITEM':
      nextState = {
        ...state,
        menuItems: state.menuItems.map((item) =>
          item.id === action.payload.id ? { ...item, ...action.payload.item } : item
        ),
      };
      break;

    case 'DELETE_MENU_ITEM':
      nextState = {
        ...state,
        menuItems: state.menuItems.filter((item) => item.id !== action.payload),
      };
      break;

    case 'UPDATE_ITEM_PRICE':
      nextState = {
        ...state,
        menuItems: state.menuItems.map((item) =>
          item.id === action.payload.id ? { ...item, precio: action.payload.precio } : item
        ),
      };
      break;

    case 'TOGGLE_ITEM_DISPONIBLE':
      nextState = {
        ...state,
        menuItems: state.menuItems.map((item) =>
          item.id === action.payload ? { ...item, disponible: !item.disponible } : item
        ),
      };
      break;

    case 'TOGGLE_ITEM_POPULAR':
      nextState = {
        ...state,
        menuItems: state.menuItems.map((item) =>
          item.id === action.payload ? { ...item, popular: !item.popular } : item
        ),
      };
      break;

    // ── Promos ──
    case 'ADD_PROMO': {
      const newPromo: Promo = {
        ...action.payload,
        id: action.payload.id || `promo-${Date.now()}`,
      };
      nextState = { ...state, promos: [newPromo, ...state.promos] };
      break;
    }

    case 'UPDATE_PROMO':
      nextState = {
        ...state,
        promos: state.promos.map((p) =>
          p.id === action.payload.id ? { ...p, ...action.payload.promo } : p
        ),
      };
      break;

    case 'DELETE_PROMO':
      nextState = {
        ...state,
        promos: state.promos.filter((p) => p.id !== action.payload),
      };
      break;

    case 'TOGGLE_PROMO_ACTIVE':
      nextState = {
        ...state,
        promos: state.promos.map((p) =>
          p.id === action.payload ? { ...p, activa: !p.activa } : p
        ),
      };
      break;

    // ── Gaming ──
    case 'UPDATE_GAMING_STATION':
      nextState = {
        ...state,
        gamingStations: state.gamingStations.map((s) =>
          s.id === action.payload.id ? { ...s, ...action.payload.station } : s
        ),
      };
      break;

    // ── Info General ──
    case 'UPDATE_INFO_GENERAL':
      nextState = {
        ...state,
        infoGeneral: { ...state.infoGeneral, ...action.payload },
      };
      break;

    default:
      return state;
  }

  // Guardar en localStorage automáticamente para persistencia inmediata
  try {
    localStorage.setItem(
      'lvlup_store',
      JSON.stringify({
        menuItems: nextState.menuItems,
        gamingStations: nextState.gamingStations,
        promos: nextState.promos,
        infoGeneral: nextState.infoGeneral,
      })
    );
  } catch {
    // ignore quota error
  }

  return nextState;
}

export function getSavedInitialState(): StoreState {
  try {
    const saved = localStorage.getItem('lvlup_store');
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        isAdminMode: false,
        searchQuery: '',
        activeCategory: 'todos',
        menuItems: parsed.menuItems || initialMenuItems,
        gamingStations: parsed.gamingStations || initialGamingStations,
        promos: parsed.promos || initialPromos,
        infoGeneral: parsed.infoGeneral || initialInfoGeneral,
      };
    }
  } catch {
    // fallback
  }

  return {
    isAdminMode: false,
    searchQuery: '',
    activeCategory: 'todos',
    menuItems: initialMenuItems,
    gamingStations: initialGamingStations,
    promos: initialPromos,
    infoGeneral: initialInfoGeneral,
  };
}

export const initialState: StoreState = getSavedInitialState();

export interface StoreContextValue extends StoreState {
  toggleAdminMode: () => void;
  setSearch: (q: string) => void;
  setCategory: (c: string) => void;
  // Menu
  addMenuItem: (item: Omit<MenuItem, 'id'> & { id?: string }) => void;
  updateMenuItem: (id: string, item: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;
  updateItemPrice: (id: string, precio: number) => void;
  toggleItemDisponible: (id: string) => void;
  toggleItemPopular: (id: string) => void;
  // Promos
  addPromo: (promo: Omit<Promo, 'id'> & { id?: string }) => void;
  updatePromo: (id: string, promo: Partial<Promo>) => void;
  deletePromo: (id: string) => void;
  togglePromoActive: (id: string) => void;
  // Gaming
  updateGamingStation: (id: string, station: Partial<GamingStation>) => void;
  // Info
  updateInfoGeneral: (info: Partial<InfoGeneral>) => void;
}

export const StoreContext = createContext<StoreContextValue | null>(null);
