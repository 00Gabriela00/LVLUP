import { BusinessRepository } from './repository';

export class BusinessService {
  constructor(private repository: BusinessRepository) {}

  async getInfo() {
    return this.repository.getInfo();
  }

  async updateInfo(data: any) {
    return this.repository.updateInfo(data);
  }
}
