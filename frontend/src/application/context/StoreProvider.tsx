import { useReducer, useCallback, useEffect, ReactNode } from 'react';
import type { MenuItem, GamingStation, Promo, InfoGeneral } from '../../infrastructure/data/initialData';
import { StoreContext, reducer, initialState, type StoreState } from './StoreContext';
import { apiClient } from '../../infrastructure/services/apiClient';

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // ── Sincronización Automática con PostgreSQL al iniciar ──
  useEffect(() => {
    let isMounted = true;

    async function syncWithBackend() {
      try {
        const [menu, promos, gaming, business] = await Promise.all([
          apiClient.getMenu(),
          apiClient.getPromos(),
          apiClient.getGaming(),
          apiClient.getBusiness(),
        ]);

        if (isMounted) {
          const payload: Partial<StoreState> = {};
          if (menu && menu.length > 0) payload.menuItems = menu;
          if (promos && promos.length > 0) payload.promos = promos;
          if (gaming && gaming.length > 0) payload.gamingStations = gaming;
          if (business) payload.infoGeneral = business;

          if (Object.keys(payload).length > 0) {
            dispatch({ type: 'HYDRATE_STORE', payload });
          }
        }
      } catch {
        // En caso de que el backend aún esté iniciando, usamos cache local
      }
    }

    syncWithBackend();

    return () => {
      isMounted = false;
    };
  }, []);

  const toggleAdminMode = useCallback(() => dispatch({ type: 'TOGGLE_ADMIN_MODE' }), []);
  const setSearch = useCallback((q: string) => dispatch({ type: 'SET_SEARCH', payload: q }), []);
  const setCategory = useCallback((c: string) => dispatch({ type: 'SET_CATEGORY', payload: c }), []);

  // ── Menu Callbacks (State + PostgreSQL) ──
  const addMenuItem = useCallback((item: Omit<MenuItem, 'id'> & { id?: string }) => {
    dispatch({ type: 'ADD_MENU_ITEM', payload: item });
    apiClient.createMenuItem(item);
  }, []);

  const updateMenuItem = useCallback((id: string, item: Partial<MenuItem>) => {
    dispatch({ type: 'UPDATE_MENU_ITEM', payload: { id, item } });
    apiClient.updateMenuItem(id, item);
  }, []);

  const deleteMenuItem = useCallback((id: string) => {
    dispatch({ type: 'DELETE_MENU_ITEM', payload: id });
    apiClient.deleteMenuItem(id);
  }, []);

  const updateItemPrice = useCallback((id: string, precio: number) => {
    dispatch({ type: 'UPDATE_ITEM_PRICE', payload: { id, precio } });
    apiClient.updateMenuItem(id, { precio });
  }, []);

  const toggleItemDisponible = useCallback((id: string) => {
    dispatch({ type: 'TOGGLE_ITEM_DISPONIBLE', payload: id });
    apiClient.toggleItemDisponible(id);
  }, []);

  const toggleItemPopular = useCallback((id: string) => {
    dispatch({ type: 'TOGGLE_ITEM_POPULAR', payload: id });
    apiClient.toggleItemPopular(id);
  }, []);

  // ── Promo Callbacks (State + PostgreSQL) ──
  const addPromo = useCallback((promo: Omit<Promo, 'id'> & { id?: string }) => {
    dispatch({ type: 'ADD_PROMO', payload: promo });
    apiClient.createPromo(promo);
  }, []);

  const updatePromo = useCallback((id: string, promo: Partial<Promo>) => {
    dispatch({ type: 'UPDATE_PROMO', payload: { id, promo } });
    apiClient.updatePromo(id, promo);
  }, []);

  const deletePromo = useCallback((id: string) => {
    dispatch({ type: 'DELETE_PROMO', payload: id });
    apiClient.deletePromo(id);
  }, []);

  const togglePromoActive = useCallback((id: string) => {
    dispatch({ type: 'TOGGLE_PROMO_ACTIVE', payload: id });
    apiClient.togglePromoActive(id);
  }, []);

  // ── Gaming Callback (State + PostgreSQL) ──
  const updateGamingStation = useCallback((id: string, station: Partial<GamingStation>) => {
    dispatch({ type: 'UPDATE_GAMING_STATION', payload: { id, station } });
    apiClient.updateGamingStation(id, station);
  }, []);

  // ── Info Callback (State + PostgreSQL) ──
  const updateInfoGeneral = useCallback((info: Partial<InfoGeneral>) => {
    dispatch({ type: 'UPDATE_INFO_GENERAL', payload: info });
    apiClient.updateBusiness(info);
  }, []);

  return (
    <StoreContext.Provider
      value={{
        ...state,
        toggleAdminMode,
        setSearch,
        setCategory,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        updateItemPrice,
        toggleItemDisponible,
        toggleItemPopular,
        addPromo,
        updatePromo,
        deletePromo,
        togglePromoActive,
        updateGamingStation,
        updateInfoGeneral,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}
