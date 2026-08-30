import { prisma } from '../../core/prisma';

export class PromoRepository {
  async getAll() {
    return prisma.promo.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async getById(id: string) {
    return prisma.promo.findUnique({
      where: { id },
    });
  }

  async create(data: {
    title: string;
    description: string;
    days?: string[];
    startTime?: string;
    endTime?: string;
    promoPrice?: number;
    isActive?: boolean;
    tag?: string;
    color?: string;
  }) {
    return prisma.promo.create({
      data,
    });
  }

  async update(
    id: string,
    data: Partial<{
      title: string;
      description: string;
      days: string[];
      startTime: string;
      endTime: string;
      promoPrice: number;
      isActive: boolean;
      tag: string;
      color: string;
    }>
  ) {
    return prisma.promo.update({
      where: { id },
      data,
    });
  }

  async toggleActive(id: string) {
    const promo = await this.getById(id);
    if (!promo) throw new Error('Promoción no encontrada');
    return prisma.promo.update({
      where: { id },
      data: { isActive: !promo.isActive },
    });
  }

  async delete(id: string) {
    return prisma.promo.delete({
      where: { id },
    });
  }
}
