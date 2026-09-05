import { BusinessRepository } from './repository';

export class BusinessService {
  constructor(private repository: BusinessRepository) {}

  async getInfo() {
    return this.repository.getInfo();
  }

  async updateInfo(data: any) {
    const formatted: any = {};

    if (data.name !== undefined) {
      formatted.name = String(data.name || '').trim().slice(0, 100) || 'LVLUP Game Bar & Lounge';
    }
    if (data.slogan !== undefined) {
      formatted.slogan = String(data.slogan || '').trim().slice(0, 150) || 'Juega, Come, Vive la Noche';
    }
    if (data.address !== undefined) {
      formatted.address = String(data.address || '').trim().slice(0, 200);
    }
    if (data.whatsapp !== undefined) {
      formatted.whatsapp = String(data.whatsapp || '').trim().slice(0, 30);
    }
    if (data.instagram !== undefined) {
      formatted.instagram = String(data.instagram || '').trim().slice(0, 50);
    }
    if (data.hoursJson !== undefined) {
      formatted.hoursJson = typeof data.hoursJson === 'object' ? data.hoursJson : null;
    }

    return this.repository.updateInfo(formatted);
  }
}
