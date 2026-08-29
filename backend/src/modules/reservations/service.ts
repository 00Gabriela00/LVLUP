import { ReservationsRepository, ReservationData } from './repository';

export class ReservationsService {
  constructor(private repository: ReservationsRepository) {}

  async getAll() {
    return this.repository.findAll();
  }

  async create(data: ReservationData) {
    if (!data.name) {
      throw new Error('Name is required');
    }
    return this.repository.create(data);
  }
}
