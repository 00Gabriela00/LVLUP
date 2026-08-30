import { Game } from '../models/Game';
import { Plan } from '../models/Plan';

export interface GamingRepository {
  getGames(): Promise<Game[]>;
  getPlans(): Promise<Plan[]>;
}
