import { Router } from 'express';
import { PromoController } from './controller';
import { PromoService } from './service';
import { PromoRepository } from './repository';
import { requireAuth } from '../../core/authMiddleware';

const promosRouter = Router();

const repository = new PromoRepository();
const service = new PromoService(repository);
const controller = new PromoController(service);

// 1. Rutas Públicas (Lectura en la web de clientes)
promosRouter.get('/', (req, res) => controller.getAll(req, res));
promosRouter.get('/:id', (req, res) => controller.getById(req, res));

// 2. Rutas Protegidas (Solo Administrador)
promosRouter.post('/', requireAuth, (req, res) => controller.create(req, res));
promosRouter.put('/:id', requireAuth, (req, res) => controller.update(req, res));
promosRouter.patch('/:id/toggle-active', requireAuth, (req, res) => controller.toggleActive(req, res));
promosRouter.delete('/:id', requireAuth, (req, res) => controller.delete(req, res));

export { promosRouter };
