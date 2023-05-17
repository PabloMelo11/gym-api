import { describe, it, expect, beforeEach } from 'vitest';
import { CheckInUseCase } from './check-in';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { CheckInsRepository } from '@/repositories/check-ins-repository';

describe('CheckIn Use Case', () => {
  let checkInsRepository: CheckInsRepository;
  let useCase: CheckInUseCase;

  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    useCase = new CheckInUseCase(checkInsRepository);
  });

  it('should be able to check in', async () => {
    const { checkIn } = await useCase.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
