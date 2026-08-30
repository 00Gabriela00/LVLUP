import { Request, Response } from 'express';
import { PromoService } from './service';

export class PromoController {
  constructor(private service: PromoService) {}

  async getAll(req: Request, res: Response) {
    try {
      const promos = await this.service.getAll();
      res.json(promos);
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Error al obtener promociones' });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      const promo = await this.service.getById(id);
      res.json(promo);
    } catch (error: any) {
      res.status(404).json({ error: error.message || 'Promoción no encontrada' });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const promo = await this.service.create(req.body);
      res.status(201).json(promo);
    } catch (error: any) {
      res.status(400).json({ error: error.message || 'Error al crear promoción' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      const promo = await this.service.update(id, req.body);
      res.json(promo);
    } catch (error: any) {
      res.status(400).json({ error: error.message || 'Error al actualizar promoción' });
    }
  }

  async toggleActive(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      const promo = await this.service.toggleActive(id);
      res.json(promo);
    } catch (error: any) {
      res.status(400).json({ error: error.message || 'Error al cambiar estado de la promoción' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      await this.service.delete(id);
      res.json({ success: true, message: 'Promoción eliminada correctamente' });
    } catch (error: any) {
      res.status(400).json({ error: error.message || 'Error al eliminar promoción' });
    }
  }
}
