export type ConsoleType = 'PS5' | 'Switch' | 'Retro' | 'PC';
export type TableType = 'Pool' | 'Ping-Pong';

export interface Game {
  id: string;
  title: string;
  category: 'Combate' | 'Carreras' | 'Deportes' | 'Aventura' | 'Mesa';
  platform: ConsoleType | TableType;
  imageUrl: string;
  isAvailable: boolean;
  isPopular?: boolean;
}
