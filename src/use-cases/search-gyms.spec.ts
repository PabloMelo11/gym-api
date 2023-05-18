import { describe, it, expect, beforeEach } from 'vitest';
import { SearchGymsUseCase } from './search-gyms';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';

describe('Search Gyms Use Case', () => {
  let gymsRepository: InMemoryGymsRepository;
  let useCase: SearchGymsUseCase;

  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    useCase = new SearchGymsUseCase(gymsRepository);
  });

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'JavaScript Gym',
      description: 'gym-01',
      phone: '19983435514',
      latitude: -22.4583086,
      longitude: -47.0723589,
    });

    await gymsRepository.create({
      title: 'TypeScript Gym',
      description: 'gym-02',
      phone: '19983435514',
      latitude: -22.4583086,
      longitude: -47.0723589,
    });

    const { gyms } = await useCase.execute({
      query: 'JavaScript',
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym' }),
    ]);
  });

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `JavaScript Gym ${i}`,
        description: 'gym-01',
        phone: '19983435514',
        latitude: -22.4583086,
        longitude: -47.0723589,
      });
    }

    const { gyms } = await useCase.execute({
      query: 'JavaScript',
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym 21' }),
      expect.objectContaining({ title: 'JavaScript Gym 22' }),
    ]);
  });
});
