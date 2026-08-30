import { prisma } from '../../core/prisma';
import { StationType } from '@prisma/client';

export class GamingRepository {
  async getAll() {
    return prisma.gamingStation.findMany({
      orderBy: { orderIndex: 'asc' },
    });
  }

  async getById(id: string) {
    return prisma.gamingStation.findUnique({
      where: { id },
    });
  }

  async create(data: {
    name: string;
    type: StationType;
    description?: string;
    price30min?: number;
    price1hour?: number;
    features?: string[];
    isAvailable?: boolean;
    orderIndex?: number;
  }) {
    return prisma.gamingStation.create({
      data,
    });
  }

  async update(
    id: string,
    data: Partial<{
      name: string;
      type: StationType;
      description: string;
      price30min: number;
      price1hour: number;
      features: string[];
      isAvailable: boolean;
      orderIndex: number;
    }>
  ) {
    return prisma.gamingStation.update({
      where: { id },
      data,
    });
  }

  async toggleAvailable(id: string) {
    const station = await this.getById(id);
    if (!station) throw new Error('Estación no encontrada');
    return prisma.gamingStation.update({
      where: { id },
      data: { isAvailable: !station.isAvailable },
    });
  }
}
