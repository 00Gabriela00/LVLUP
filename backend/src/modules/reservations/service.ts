import { ReservationsRepository } from './repository';

export class ReservationsService {
  constructor(private repository: ReservationsRepository) {}

  async getAll() {
    // Acá puede ir lógica extra (filtrar por usuario, permisos, etc)
    return this.repository.findAll();
  }

  async create(data: any) {
    // Validaciones de negocio: ¿hay disponibilidad?, ¿el horario es válido?
    if (!data.name) {
      throw new Error('Name is required');
    }
    return this.repository.create(data);
  }
}
