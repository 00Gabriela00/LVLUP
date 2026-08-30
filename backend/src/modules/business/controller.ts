import { Request, Response } from 'express';
import { BusinessService } from './service';

export class BusinessController {
  constructor(private service: BusinessService) {}

  async getInfo(req: Request, res: Response) {
    try {
      const info = await this.service.getInfo();
      res.json(info);
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Error al obtener información' });
    }
  }

  async updateInfo(req: Request, res: Response) {
    try {
      const info = await this.service.updateInfo(req.body);
      res.json(info);
    } catch (error: any) {
      res.status(400).json({ error: error.message || 'Error al actualizar información' });
    }
  }
}
