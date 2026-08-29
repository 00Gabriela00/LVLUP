// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

export interface ReservationData {
  name: string;
  email?: string;
  phone?: string;
  date?: string;
  guests?: number;
  notes?: string;
}

export interface Reservation extends ReservationData {
  id: number;
}

export class ReservationsRepository {
  async findAll(): Promise<Reservation[]> {
    // return prisma.reservation.findMany();
    return [{ id: 1, name: 'Dummy Reservation' }];
  }

  async create(data: ReservationData): Promise<Reservation> {
    // return prisma.reservation.create({ data });
    return { id: Math.random(), ...data };
  }
}
