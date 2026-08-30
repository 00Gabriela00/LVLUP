import { Request, Response } from 'express';
import { AuthService } from './service';
import { AuthRequest } from '../../core/authMiddleware';

export class AuthController {
  constructor(private service: AuthService) {}

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await this.service.login(email, password);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message || 'Error al iniciar sesión' });
    }
  }

  async me(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'No autorizado' });
      }
      const admin = await this.service.getMe(req.user.userId);
      res.json(admin);
    } catch (error: any) {
      res.status(404).json({ error: error.message || 'Usuario no encontrado' });
    }
  }

  async changePassword(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'No autorizado' });
      }
      const { currentPassword, newPassword } = req.body;
      const result = await this.service.changePassword(req.user.userId, currentPassword, newPassword);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message || 'Error al cambiar contraseña' });
    }
  }
}
