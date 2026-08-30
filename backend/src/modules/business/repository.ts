import { prisma } from '../../core/prisma';

export class BusinessRepository {
  async getInfo() {
    let info = await prisma.businessInfo.findFirst();
    if (!info) {
      info = await prisma.businessInfo.create({
        data: {
          id: 'default',
          name: 'LVLUP Game Bar & Lounge',
          slogan: 'Juega, Come, Vive la Noche',
          address: 'Centro Comercial Las Virtudes, Valencia, Venezuela',
          whatsapp: '+58 424-0000000',
          instagram: '@lvlup_gamebar',
          hoursJson: {
            Lunes: '2:00pm — 12:00am',
            Martes: '2:00pm — 12:00am',
            Miercoles: '2:00pm — 12:00am',
            Jueves: '2:00pm — 12:00am',
            Viernes: '2:00pm — 2:00am',
            Sabado: '12:00pm — 2:00am',
            Domingo: '12:00pm — 12:00am',
          },
        },
      });
    }
    return info;
  }

  async updateInfo(data: {
    name?: string;
    slogan?: string;
    address?: string;
    whatsapp?: string;
    instagram?: string;
    hoursJson?: any;
  }) {
    const current = await this.getInfo();
    return prisma.businessInfo.update({
      where: { id: current.id },
      data,
    });
  }
}
