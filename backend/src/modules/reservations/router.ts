import { Router } from 'express';
import { ReservationsController } from './controller';
import { ReservationsService } from './service';
import { ReservationsRepository } from './repository';

export const reservationsRouter = Router();

// Dependecy Injection (Inyección manual por ahora)
const repository = new ReservationsRepository();
const service = new ReservationsService(repository);
const controller = new ReservationsController(service);

reservationsRouter.get('/', (req, res) => controller.getAll(req, res));
reservationsRouter.post('/', (req, res) => controller.create(req, res));
