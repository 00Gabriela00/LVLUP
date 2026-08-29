import { useState, useEffect } from 'react';
import { Game } from '../../domain/models/Game';
import { getRepository } from '../../infrastructure/repositories/repository';

export function useGames() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getRepository()
      .getGames()
      .then((data) => {
        setGames(data);
      })
      .catch((err) => {
        setError(err.message || 'Error loading games');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { games, loading, error };
}
