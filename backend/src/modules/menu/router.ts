import { Router } from 'express';
import { MenuController } from './controller';
import { MenuService } from './service';
import { MenuRepository } from './repository';
import { requireAuth } from '../../core/authMiddleware';

const menuRouter = Router();

const repository = new MenuRepository();
const service = new MenuService(repository);
const controller = new MenuController(service);

// 1. Rutas Públicas (Lectura rápida en la web de clientes)
menuRouter.get('/', (req, res) => controller.getAll(req, res));
menuRouter.get('/:id', (req, res) => controller.getById(req, res));

// 2. Rutas Protegidas (Solo Administrador Autenticado)
menuRouter.post('/', requireAuth, (req, res) => controller.create(req, res));
menuRouter.put('/:id', requireAuth, (req, res) => controller.update(req, res));
menuRouter.patch('/:id/price', requireAuth, (req, res) => controller.updatePrice(req, res));
menuRouter.patch('/:id/toggle-available', requireAuth, (req, res) => controller.toggleAvailable(req, res));
menuRouter.patch('/:id/toggle-popular', requireAuth, (req, res) => controller.togglePopular(req, res));
menuRouter.delete('/:id', requireAuth, (req, res) => controller.delete(req, res));

export { menuRouter };
