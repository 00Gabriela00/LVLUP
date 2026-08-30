import { Router } from 'express';
import { GamingController } from './controller';
import { GamingService } from './service';
import { GamingRepository } from './repository';
import { requireAuth } from '../../core/authMiddleware';

const gamingRouter = Router();

const repository = new GamingRepository();
const service = new GamingService(repository);
const controller = new GamingController(service);

// 1. Pública
gamingRouter.get('/', (req, res) => controller.getAll(req, res));

// 2. Protegidas
gamingRouter.put('/:id', requireAuth, (req, res) => controller.update(req, res));
gamingRouter.patch('/:id/toggle-available', requireAuth, (req, res) => controller.toggleAvailable(req, res));

export { gamingRouter };
