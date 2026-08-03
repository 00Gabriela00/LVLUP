import { Request, Response } from 'express';
import { ReservationsService } from './service';

export class ReservationsController {
  constructor(private service: ReservationsService) {}

  async getAll(req: Request, res: Response) {
    try {
      const reservations = await this.service.getAll();
      res.json(reservations);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching reservations' });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const data = req.body;
      const reservation = await this.service.create(data);
      res.status(201).json(reservation);
    } catch (error) {
      res.status(500).json({ error: 'Error creating reservation' });
    }
  }
}
