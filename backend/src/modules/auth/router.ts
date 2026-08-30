import { Router } from 'express';
import { AuthController } from './controller';
import { AuthService } from './service';
import { AuthRepository } from './repository';
import { requireAuth } from '../../core/authMiddleware';
import { authRateLimiter } from '../../core/security';

const authRouter = Router();

const repository = new AuthRepository();
const service = new AuthService(repository);
const controller = new AuthController(service);

// Rutas protegidas contra ataques de fuerza bruta
authRouter.post('/login', authRateLimiter, (req, res) => controller.login(req, res));
authRouter.get('/me', requireAuth, (req, res) => controller.me(req, res));
authRouter.post('/change-password', requireAuth, (req, res) => controller.changePassword(req, res));

export { authRouter };
