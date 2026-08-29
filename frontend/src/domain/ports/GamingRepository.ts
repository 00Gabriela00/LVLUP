import { Game } from '../models/Game';
import { Plan } from '../models/Plan';
import { Tournament } from '../models/Tournament';

export interface GamingRepository {
  getGames(): Promise<Game[]>;
  getPlans(): Promise<Plan[]>;
  getTournaments(): Promise<Tournament[]>;
}
