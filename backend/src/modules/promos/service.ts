import { PromoRepository } from './repository';

export class PromoService {
  constructor(private repository: PromoRepository) {}

  async getAll() {
    return this.repository.getAll();
  }

  async getById(id: string) {
    const promo = await this.repository.getById(id);
    if (!promo) throw new Error('Promoción no encontrada');
    return promo;
  }

  async create(data: any) {
    if (!data.title || !data.description) {
      throw new Error('Título y descripción de la promoción requeridos');
    }
    return this.repository.create(data);
  }

  async update(id: string, data: any) {
    return this.repository.update(id, data);
  }

  async toggleActive(id: string) {
    return this.repository.toggleActive(id);
  }

  async delete(id: string) {
    return this.repository.delete(id);
  }
}
