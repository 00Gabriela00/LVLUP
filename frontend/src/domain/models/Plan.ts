export interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
  isPopular?: boolean;
  type: 'BÁSICO' | 'PREMIUM' | 'VIP';
}
