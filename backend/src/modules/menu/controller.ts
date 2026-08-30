import { Request, Response } from 'express';
import { MenuService } from './service';

export class MenuController {
  constructor(private service: MenuService) {}

  async getAll(req: Request, res: Response) {
    try {
      const items = await this.service.getAll();
      res.json(items);
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Error al obtener el menú' });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      const item = await this.service.getById(id);
      res.json(item);
    } catch (error: any) {
      res.status(404).json({ error: error.message || 'Item no encontrado' });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const item = await this.service.create(req.body);
      res.status(201).json(item);
    } catch (error: any) {
      res.status(400).json({ error: error.message || 'Error al crear item' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      const item = await this.service.update(id, req.body);
      res.json(item);
    } catch (error: any) {
      res.status(400).json({ error: error.message || 'Error al actualizar item' });
    }
  }

  async updatePrice(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      const { price } = req.body;
      const item = await this.service.updatePrice(id, parseFloat(price));
      res.json(item);
    } catch (error: any) {
      res.status(400).json({ error: error.message || 'Error al actualizar precio' });
    }
  }

  async toggleAvailable(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      const item = await this.service.toggleAvailable(id);
      res.json(item);
    } catch (error: any) {
      res.status(400).json({ error: error.message || 'Error al cambiar disponibilidad' });
    }
  }

  async togglePopular(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      const item = await this.service.togglePopular(id);
      res.json(item);
    } catch (error: any) {
      res.status(400).json({ error: error.message || 'Error al cambiar estado popular' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      await this.service.delete(id);
      res.json({ success: true, message: 'Item eliminado correctamente' });
    } catch (error: any) {
      res.status(400).json({ error: error.message || 'Error al eliminar item' });
    }
  }
}
