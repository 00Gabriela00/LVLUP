import { PromoRepository } from './repository';

export class PromoService {
  constructor(private repository: PromoRepository) {}

  async getAll() {
    return this.repository.getAll();
  }

  async getById(id: string) {
    if (!id || typeof id !== 'string') {
      throw new Error('Identificador de promoción inválido');
    }
    const promo = await this.repository.getById(id);
    if (!promo) throw new Error('Promoción no encontrada');
    return promo;
  }

  private validateAndFormat(data: any, isPartial = false) {
    const formatted: any = {};

    if (!isPartial || data.title !== undefined) {
      if (!data.title || typeof data.title !== 'string' || data.title.trim().length < 2) {
        throw new Error('El título de la promoción debe tener al menos 2 caracteres.');
      }
      formatted.title = data.title.trim().slice(0, 100);
    }

    if (!isPartial || data.description !== undefined) {
      if (!data.description || typeof data.description !== 'string') {
        throw new Error('La descripción de la promoción es obligatoria.');
      }
      formatted.description = data.description.trim().slice(0, 300);
    }

    if (data.promoPrice !== undefined) {
      if (data.promoPrice === null || data.promoPrice === '') {
        formatted.promoPrice = null;
      } else {
        const num = Number(data.promoPrice);
        if (isNaN(num) || num < 0) {
          throw new Error('El precio promocional no puede ser negativo.');
        }
        formatted.promoPrice = Math.round(num * 100) / 100;
      }
    }

    if (data.color !== undefined) {
      const validColors = ['pink', 'cyan', 'purple'];
      formatted.color = validColors.includes(data.color) ? data.color : 'pink';
    }

    if (data.tag !== undefined) {
      formatted.tag = typeof data.tag === 'string' ? data.tag.trim().slice(0, 30) : null;
    }

    if (data.days !== undefined) {
      formatted.days = Array.isArray(data.days)
        ? data.days.map((d: any) => String(d).trim()).filter(Boolean)
        : [];
    }

    if (data.startTime !== undefined) formatted.startTime = String(data.startTime || '').trim();
    if (data.endTime !== undefined) formatted.endTime = String(data.endTime || '').trim();
    if (data.isActive !== undefined) formatted.isActive = Boolean(data.isActive);

    return formatted;
  }

  async create(data: any) {
    const validated = this.validateAndFormat(data, false);
    return this.repository.create(validated);
  }

  async update(id: string, data: any) {
    if (!id || typeof id !== 'string') {
      throw new Error('Identificador de promoción inválido');
    }
    const validated = this.validateAndFormat(data, true);
    return this.repository.update(id, validated);
  }

  async toggleActive(id: string) {
    if (!id) throw new Error('ID requerido');
    return this.repository.toggleActive(id);
  }

  async delete(id: string) {
    if (!id) throw new Error('ID requerido');
    return this.repository.delete(id);
  }
}
