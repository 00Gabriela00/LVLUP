import { GamingRepository } from './repository';

export class GamingService {
  constructor(private repository: GamingRepository) {}

  async getAll() {
    return this.repository.getAll();
  }

  async update(id: string, data: any) {
    return this.repository.update(id, data);
  }

  async toggleAvailable(id: string) {
    return this.repository.toggleAvailable(id);
  }
}
