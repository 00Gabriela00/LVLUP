import { MockGamingRepository } from './MockGamingRepository';

let instance: MockGamingRepository | null = null;

export function getRepository(): MockGamingRepository {
  if (!instance) {
    instance = new MockGamingRepository();
  }
  return instance;
}
