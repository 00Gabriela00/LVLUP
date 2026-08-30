import { Request, Response } from 'express';
import { GamingService } from './service';

export class GamingController {
  constructor(private service: GamingService) {}

  async getAll(req: Request, res: Response) {
    try {
      const stations = await this.service.getAll();
      res.json(stations);
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Error al obtener estaciones gaming' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      const station = await this.service.update(id, req.body);
      res.json(station);
    } catch (error: any) {
      res.status(400).json({ error: error.message || 'Error al actualizar estación' });
    }
  }

  async toggleAvailable(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      const station = await this.service.toggleAvailable(id);
      res.json(station);
    } catch (error: any) {
      res.status(400).json({ error: error.message || 'Error al cambiar disponibilidad' });
    }
  }
}
