import { prisma } from '../../core/prisma';
import { AdminRole } from '@prisma/client';

export class AuthRepository {
  async findAdminByEmail(email: string) {
    return prisma.adminUser.findUnique({
      where: { email: email.toLowerCase().trim() },
    });
  }

  async findAdminById(id: string) {
    return prisma.adminUser.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });
  }

  async createAdmin(data: {
    email: string;
    password: string;
    name: string;
    role?: AdminRole;
  }) {
    return prisma.adminUser.create({
      data: {
        email: data.email.toLowerCase().trim(),
        password: data.password,
        name: data.name,
        role: data.role || AdminRole.STAFF,
      },
    });
  }

  async updatePassword(id: string, newPasswordHash: string) {
    return prisma.adminUser.update({
      where: { id },
      data: { password: newPasswordHash },
    });
  }
}
