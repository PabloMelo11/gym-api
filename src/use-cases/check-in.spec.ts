import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { CheckInUseCase } from './check-in';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { CheckInsRepository } from '@/repositories/check-ins-repository';

describe('CheckIn Use Case', () => {
  let checkInsRepository: CheckInsRepository;
  let useCase: CheckInUseCase;

  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    useCase = new CheckInUseCase(checkInsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to check in', async () => {
    const { checkIn } = await useCase.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await useCase.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    });

    await expect(() =>
      useCase.execute({
        gymId: 'gym-01',
        userId: 'user-01',
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await useCase.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    });

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

    const { checkIn } = await useCase.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
