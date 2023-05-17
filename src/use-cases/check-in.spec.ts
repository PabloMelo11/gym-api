import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { CheckInUseCase } from './check-in';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { Decimal } from '@prisma/client/runtime/library';

describe('CheckIn Use Case', () => {
  let checkInsRepository: InMemoryCheckInsRepository;
  let gymsRepository: InMemoryGymsRepository;
  let useCase: CheckInUseCase;

  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    useCase = new CheckInUseCase(checkInsRepository, gymsRepository);

    gymsRepository.gyms.push({
      id: 'gym-01',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-22.5772356),
      longitude: new Decimal(-47.4196327),
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to check in', async () => {
    const { checkIn } = await useCase.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.5772356,
      userLongitude: -47.4196327,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await useCase.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.5772356,
      userLongitude: -47.4196327,
    });

    await expect(() =>
      useCase.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -22.5772356,
        userLongitude: -47.4196327,
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await useCase.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.5772356,
      userLongitude: -47.4196327,
    });

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

    const { checkIn } = await useCase.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.5772356,
      userLongitude: -47.4196327,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.gyms.push({
      id: 'gym-02',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-22.5266684),
      longitude: new Decimal(-47.3176314),
    });

    await expect(() =>
      useCase.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -22.4583086,
        userLongitude: -47.0723589,
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
