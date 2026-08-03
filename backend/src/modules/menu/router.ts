import { Router } from 'express';
import { MenuController } from './controller';
import { MenuService } from './service';
import { MenuRepository } from './repository';

export const menuRouter = Router();

const repository = new MenuRepository();
const service = new MenuService(repository);
const controller = new MenuController(service);

menuRouter.get('/', (req, res) => controller.getAll(req, res));
