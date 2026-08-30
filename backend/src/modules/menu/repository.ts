import { prisma } from '../../core/prisma';
import { MenuCategory } from '@prisma/client';

export class MenuRepository {
  async getAll() {
    return prisma.menuItem.findMany({
      orderBy: [{ orderIndex: 'asc' }, { createdAt: 'desc' }],
    });
  }

  async getById(id: string) {
    return prisma.menuItem.findUnique({
      where: { id },
    });
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
    return prisma.menuItem.create({
      data,
    });
  }

  async update(
    id: string,
    data: Partial<{
      name: string;
      description: string;
      price: number;
      category: MenuCategory;
      photoUrl: string;
      isAvailable: boolean;
      isPopular: boolean;
      promoTag: string;
      tags: string[];
      ingredients: string[];
    }>
  ) {
    return prisma.menuItem.update({
      where: { id },
      data,
    });
  }

  async updatePrice(id: string, price: number) {
    return prisma.menuItem.update({
      where: { id },
      data: { price },
    });
  }

  async toggleAvailable(id: string) {
    const item = await this.getById(id);
    if (!item) throw new Error('Item no encontrado');
    return prisma.menuItem.update({
      where: { id },
      data: { isAvailable: !item.isAvailable },
    });
  }

  async togglePopular(id: string) {
    const item = await this.getById(id);
    if (!item) throw new Error('Item no encontrado');
    return prisma.menuItem.update({
      where: { id },
      data: { isPopular: !item.isPopular },
    });
  }

  async delete(id: string) {
    return prisma.menuItem.delete({
      where: { id },
    });
  }
}
