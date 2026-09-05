import { GamingRepository } from './repository';

export class GamingService {
  constructor(private repository: GamingRepository) {}

  async getAll() {
    return this.repository.getAll();
  }

  async update(id: string, data: any) {
    if (!id || typeof id !== 'string') {
      throw new Error('Identificador de estación inválido');
    }

    const formatted: any = {};
    if (data.name !== undefined) {
      if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
        throw new Error('El nombre de la estación debe tener al menos 2 caracteres.');
      }
      formatted.name = data.name.trim().slice(0, 80);
    }

    if (data.price30min !== undefined) {
      const p30 = Number(data.price30min);
      if (isNaN(p30) || p30 < 0) {
        throw new Error('El precio de 30 min debe ser un valor numérico válido.');
      }
      formatted.price30min = Math.round(p30 * 100) / 100;
    }

    if (data.price1hour !== undefined) {
      const p60 = Number(data.price1hour);
      if (isNaN(p60) || p60 < 0) {
        throw new Error('El precio de 1 hora debe ser un valor numérico válido.');
      }
      formatted.price1hour = Math.round(p60 * 100) / 100;
    }

    if (data.description !== undefined) {
      formatted.description = typeof data.description === 'string' ? data.description.trim().slice(0, 300) : '';
    }

    if (data.features !== undefined) {
      formatted.features = Array.isArray(data.features)
        ? data.features.map((f: any) => String(f).trim()).filter(Boolean)
        : [];
    }

    if (data.isAvailable !== undefined) {
      formatted.isAvailable = Boolean(data.isAvailable);
    }

    return this.repository.update(id, formatted);
  }

  async toggleAvailable(id: string) {
    if (!id) throw new Error('ID de estación requerido');
    return this.repository.toggleAvailable(id);
  }
}
