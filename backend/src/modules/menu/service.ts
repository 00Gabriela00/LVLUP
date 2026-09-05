import { MenuRepository } from './repository';
import { MenuCategory } from '@prisma/client';

const VALID_CATEGORIES = Object.values(MenuCategory);

export class MenuService {
  constructor(private repository: MenuRepository) {}

  async getAll() {
    return this.repository.getAll();
  }

  async getById(id: string) {
    if (!id || typeof id !== 'string') {
      throw new Error('Identificador de item inválido');
    }
    const item = await this.repository.getById(id);
    if (!item) throw new Error('Item no encontrado en el menú');
    return item;
  }

  private validateAndFormat(data: any, isPartial = false) {
    const formatted: any = {};

    if (!isPartial || data.name !== undefined) {
      if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
        throw new Error('El nombre del plato debe tener al menos 2 caracteres.');
      }
      if (data.name.trim().length > 100) {
        throw new Error('El nombre del plato no puede exceder los 100 caracteres.');
      }
      formatted.name = data.name.trim();
    }

    if (!isPartial || data.price !== undefined) {
      const numPrice = Number(data.price);
      if (isNaN(numPrice) || !isFinite(numPrice) || numPrice <= 0) {
        throw new Error('El precio debe ser un número positivo mayor a 0.');
      }
      if (numPrice > 9999) {
        throw new Error('El precio no puede exceder los $9,999.');
      }
      formatted.price = Math.round(numPrice * 100) / 100;
    }

    if (!isPartial || data.category !== undefined) {
      if (!data.category || !VALID_CATEGORIES.includes(data.category)) {
        throw new Error(`Categoría inválida. Debe ser una de: ${VALID_CATEGORIES.join(', ')}`);
      }
      formatted.category = data.category;
    }

    if (data.description !== undefined) {
      formatted.description = typeof data.description === 'string' ? data.description.trim().slice(0, 300) : '';
    }

    if (data.photoUrl !== undefined) {
      formatted.photoUrl = typeof data.photoUrl === 'string' ? data.photoUrl.trim() : null;
    }

    if (data.promoTag !== undefined) {
      formatted.promoTag = typeof data.promoTag === 'string' ? data.promoTag.trim().slice(0, 30) : null;
    }

    if (data.isAvailable !== undefined) {
      formatted.isAvailable = Boolean(data.isAvailable);
    }

    if (data.isPopular !== undefined) {
      formatted.isPopular = Boolean(data.isPopular);
    }

    if (data.tags !== undefined) {
      formatted.tags = Array.isArray(data.tags)
        ? data.tags.map((t: any) => String(t).trim()).filter(Boolean).slice(0, 10)
        : [];
    }

    if (data.ingredients !== undefined) {
      formatted.ingredients = Array.isArray(data.ingredients)
        ? data.ingredients.map((i: any) => String(i).trim()).filter(Boolean).slice(0, 20)
        : [];
    }

    return formatted;
  }

  async create(data: {
    name: string;
    description?: string;
    price: number;
    category: MenuCategory;
    photoUrl?: string;
    isAvailable?: boolean;
    isPopular?: boolean;
    promoTag?: string;
    tags?: string[];
    ingredients?: string[];
  }) {
    const validated = this.validateAndFormat(data, false);
    return this.repository.create(validated);
  }

  async update(id: string, data: any) {
    if (!id || typeof id !== 'string') {
      throw new Error('Identificador de item inválido');
    }
    const validated = this.validateAndFormat(data, true);
    return this.repository.update(id, validated);
  }

  async updatePrice(id: string, price: number) {
    if (!id || typeof id !== 'string') {
      throw new Error('Identificador de item inválido');
    }
    const numPrice = Number(price);
    if (isNaN(numPrice) || numPrice <= 0) {
      throw new Error('El precio debe ser mayor a 0');
    }
    return this.repository.updatePrice(id, Math.round(numPrice * 100) / 100);
  }

  async toggleAvailable(id: string) {
    if (!id) throw new Error('ID requerido');
    return this.repository.toggleAvailable(id);
  }

  async togglePopular(id: string) {
    if (!id) throw new Error('ID requerido');
    return this.repository.togglePopular(id);
  }

  async delete(id: string) {
    if (!id) throw new Error('ID requerido');
    return this.repository.delete(id);
  }
}
