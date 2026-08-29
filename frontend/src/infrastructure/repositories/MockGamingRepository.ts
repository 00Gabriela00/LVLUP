import { GamingRepository } from '../../domain/ports/GamingRepository';
import { Game } from '../../domain/models/Game';
import { Plan } from '../../domain/models/Plan';
import { Tournament } from '../../domain/models/Tournament';
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
          'Acceso prioritario a torneos'
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

  async getTournaments(): Promise<Tournament[]> {
    return [
      {
        id: '1',
        title: 'Super Smash Bros Invitational',
        gameTitle: 'Super Smash Bros Ultimate',
        date: '2026-10-15T18:00:00Z',
        prizePool: '$500 USD',
        status: 'Inscripción Abierta',
        imageUrl: 'https://images.unsplash.com/photo-1580234797602-22c37b4a6217?w=400&q=80'
      },
      {
        id: '2',
        title: 'Valorant 2v2 Spike Rush',
        gameTitle: 'Valorant',
        date: '2026-10-22T20:00:00Z',
        prizePool: '$800 USD',
        status: 'Inscripción Abierta',
        imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=80'
      }
    ];
  }
}
