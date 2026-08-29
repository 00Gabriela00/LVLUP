import { useState, useEffect } from 'react';
import { Tournament } from '../../domain/models/Tournament';
import { getRepository } from '../../infrastructure/repositories/repository';

export function useTournaments() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getRepository()
      .getTournaments()
      .then((data) => {
        setTournaments(data);
      })
      .catch((err) => {
        setError(err.message || 'Error loading tournaments');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { tournaments, loading, error };
}
