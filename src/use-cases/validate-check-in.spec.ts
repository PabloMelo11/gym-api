import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ValidateCheckInUseCase } from './validate-check-in';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { LateCheckInValidationError } from './errors/late-check-in-validation-error';

describe('Validate Check-in Use Case', () => {
  let checkInsRepository: InMemoryCheckInsRepository;
  let useCase: ValidateCheckInUseCase;

  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    useCase = new ValidateCheckInUseCase(checkInsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to validate the check-in', async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    });

    const { checkIn } = await useCase.execute({
      checkInId: createdCheckIn.id,
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));

    expect(checkInsRepository.checkIns[0].validated_at).toEqual(
      expect.any(Date)
    );
  });

  it('should not be able to validate inexistent check-in', async () => {
    await expect(() =>
      useCase.execute({
        checkInId: 'inexistent-check-in-id',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it('should not be able to validate the check-in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40));

    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    });

    const twentyOneMinutesInMs = 1000 * 60 * 21;
    vi.advanceTimersByTime(twentyOneMinutesInMs);

    await expect(() =>
      useCase.execute({
        checkInId: createdCheckIn.id,
      })
    ).rejects.toBeInstanceOf(LateCheckInValidationError);
  });
});
