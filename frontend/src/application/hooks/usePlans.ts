import { useState, useEffect } from 'react';
import { Plan } from '../../domain/models/Plan';
import { getRepository } from '../../infrastructure/repositories/repository';

export function usePlans() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getRepository()
      .getPlans()
      .then((data) => {
        setPlans(data);
      })
      .catch((err) => {
        setError(err.message || 'Error loading plans');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { plans, loading, error };
}
