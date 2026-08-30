import { MenuRepository } from './repository';
import { MenuCategory } from '@prisma/client';

export class MenuService {
  constructor(private repository: MenuRepository) {}

  async getAll() {
    return this.repository.getAll();
  }

  async getById(id: string) {
    const item = await this.repository.getById(id);
    if (!item) throw new Error('Item no encontrado');
    return item;
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
    if (!data.name || data.price <= 0 || !data.category) {
      throw new Error('Nombre, precio válido y categoría son requeridos');
    }
    return this.repository.create(data);
  }

  async update(id: string, data: any) {
    return this.repository.update(id, data);
  }

  async updatePrice(id: string, price: number) {
    if (price <= 0) throw new Error('El precio debe ser mayor a 0');
    return this.repository.updatePrice(id, price);
  }

  async toggleAvailable(id: string) {
    return this.repository.toggleAvailable(id);
  }

  async togglePopular(id: string) {
    return this.repository.togglePopular(id);
  }

  async delete(id: string) {
    return this.repository.delete(id);
  }
}
