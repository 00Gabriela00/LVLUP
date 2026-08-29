import { Request, Response } from 'express';
import { AuthService } from './service';

export class AuthController {
  constructor(private service: AuthService) {}

  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, password, phone } = req.body;
      if (!name || !email || !password) {
        res.status(400).json({ error: 'Name, email and password are required' });
        return;
      }

      const user = await this.service.register(name, email, password, phone);
      res.status(201).json(user);
    } catch (error: any) {
      if (error.message === 'User already exists') {
        res.status(409).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ error: 'Email and password are required' });
        return;
      }

      const result = await this.service.login(email, password);
      res.status(200).json(result);
    } catch (error: any) {
      if (error.message === 'Invalid credentials') {
        res.status(401).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  };

  me = async (req: Request, res: Response): Promise<void> => {
    // The user will be attached to the request by the auth middleware
    const user = (req as any).user;
    res.status(200).json({ user });
  };
}
