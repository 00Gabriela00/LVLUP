import { Router } from 'express';
import { BusinessController } from './controller';
import { BusinessService } from './service';
import { BusinessRepository } from './repository';
import { requireAuth } from '../../core/authMiddleware';

const businessRouter = Router();

const repository = new BusinessRepository();
const service = new BusinessService(repository);
const controller = new BusinessController(service);

businessRouter.get('/', (req, res) => controller.getInfo(req, res));
businessRouter.put('/', requireAuth, (req, res) => controller.updateInfo(req, res));

export { businessRouter };
