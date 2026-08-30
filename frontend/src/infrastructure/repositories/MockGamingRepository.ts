import { GamingRepository } from '../../domain/ports/GamingRepository';
import { Game } from '../../domain/models/Game';
import { Plan } from '../../domain/models/Plan';
import pacmanImage from '../../assets/pacman.jfif';
import streetFighterImage from '../../assets/street fighter.jpg';
import marioKartImage from '../../assets/mario-kart-8-deluxe-nintendo.jpg';
import tekkenImage from '../../assets/tekken.jfif';

export class MockGamingRepository implements GamingRepository {
  async getGames(): Promise<Game[]> {
    return [
      {
        id: '1',
        title: 'Pac-Man Battle Royale',
        category: 'Combate',
        platform: 'Retro',
        imageUrl: pacmanImage,
        isAvailable: true,
        isPopular: true
      },
      {
        id: '2',
        title: 'Street Fighter VI',
        category: 'Combate',
        platform: 'PS5',
        imageUrl: streetFighterImage,
        isAvailable: true
      },
      {
        id: '3',
        title: 'Mario Kart 8 DX',
        category: 'Carreras',
        platform: 'Switch',
        imageUrl: marioKartImage,
        isAvailable: false
      },
      {
        id: '4',
        title: 'Tekken 8',
        category: 'Combate',
        platform: 'PS5',
        imageUrl: tekkenImage,
        isAvailable: true,
        isPopular: true
      }
    ];
  }

  async getPlans(): Promise<Plan[]> {
    return [
      {
        id: '1',
        name: 'BÁSICO',
        type: 'BÁSICO',
        price: 25,
        features: [
          'Acceso a Sala Arcade General',
          'Consola de Uso Estándar',
          '1 Bebida temática de bienvenida',
          'Soporte Técnico Básico'
        ]
      },
      {
        id: '2',
        name: 'PREMIUM',
        type: 'PREMIUM',
        price: 45,
        isPopular: true,
        features: [
          'Cabina VIP Insonorizada',
          'Hardware competitivo (144Hz)',
          '2 Bebidas + 1 Info Snack Pack',
          'Reserva prioritaria en horas pico'
        ]
      },
      {
        id: '3',
        name: 'VIP',
        type: 'VIP',
        price: 80,
        features: [
          'Sala VIP privada completa',
          'Servicio de barman dedicado',
          'Cócteles temáticos ilimitados',
          'Acceso exclusivo a nuevos lanzamientos'
        ]
      }
    ];
  }
}
