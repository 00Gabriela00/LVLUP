import { Router } from 'express';
import { AuthController } from './controller';
import { authenticate } from '../../middlewares/auth.middleware';

const authRouter = Router();
const controller = new AuthController();

authRouter.post('/register', controller.register);
authRouter.post('/login', controller.login);
authRouter.get('/me', authenticate, controller.me);

export { authRouter };
