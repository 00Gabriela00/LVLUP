// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

export class ReservationsRepository {
  async findAll() {
    // return prisma.reservation.findMany();
    return [{ id: 1, name: 'Dummy Reservation' }];
  }

  async create(data: any) {
    // return prisma.reservation.create({ data });
    return { id: Math.random(), ...data };
  }
}
