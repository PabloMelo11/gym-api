import { describe, it, expect, beforeEach } from 'vitest';
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';

describe('Fetch Nearby Gyms Use Case', () => {
  let gymsRepository: InMemoryGymsRepository;
  let useCase: FetchNearbyGymsUseCase;

  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    useCase = new FetchNearbyGymsUseCase(gymsRepository);
  });

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: 'gym-01',
      phone: '19983435514',
      latitude: -22.4583086,
      longitude: -47.0723589,
    });

    await gymsRepository.create({
      title: 'Far Gym',
      description: 'gym-02',
      phone: '19983435514',
      latitude: -22.5772356,
      longitude: -47.4196327,
    });

    const { gyms } = await useCase.execute({
      userLatitude: -22.4583086,
      userLongitude: -47.0723589,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })]);
  });
});
