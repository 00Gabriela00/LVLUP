// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

export class MenuRepository {
  async findAll() {
    // return prisma.menuItem.findMany();
    return [{ id: 1, name: 'Cerveza Artesanal' }];
  }
}
