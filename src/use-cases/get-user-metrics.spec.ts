import { describe, it, expect, beforeEach } from 'vitest';
import { GetUserMetricsUseCase } from './get-user-metrics';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';

describe('Get User Metrics Use Case', () => {
  let checkInsRepository: InMemoryCheckInsRepository;
  let useCase: GetUserMetricsUseCase;

  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    useCase = new GetUserMetricsUseCase(checkInsRepository);
  });

  it('should be able to get check-ins count from metrics', async () => {
    await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    });

    await checkInsRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    });

    const { checkInsCount } = await useCase.execute({
      userId: 'user-01',
    });

    expect(checkInsCount).toEqual(2);
  });
});
