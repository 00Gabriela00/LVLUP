import { Request, Response } from 'express';
import { MenuService } from './service';

export class MenuController {
  constructor(private service: MenuService) {}

  async getAll(req: Request, res: Response) {
    try {
      const items = await this.service.getAll();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching menu' });
    }
  }
}
