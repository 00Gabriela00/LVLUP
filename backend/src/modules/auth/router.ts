import { Router } from 'express';
import { AuthController } from './controller';
import { AuthService } from './service';
import { AuthRepository } from './repository';
import { authenticate } from '../../middlewares/auth.middleware';

const authRouter = Router();

const repository = new AuthRepository();
const service = new AuthService(repository);
const controller = new AuthController(service);

authRouter.post('/register', (req, res) => controller.register(req, res));
authRouter.post('/login', (req, res) => controller.login(req, res));
authRouter.get('/me', authenticate, (req, res) => controller.me(req, res));

export { authRouter };
