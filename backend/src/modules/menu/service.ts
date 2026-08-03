import { MenuRepository } from './repository';

export class MenuService {
  constructor(private repository: MenuRepository) {}

  async getAll() {
    return this.repository.findAll();
  }
}
