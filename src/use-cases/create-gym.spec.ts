import { describe, it, expect, beforeEach } from 'vitest';
import { CreateGymUseCase } from './create-gym';
import { compare } from 'bcryptjs';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';
import { GymsRepository } from '@/repositories/gyms-repository';

describe('Create Gym Use Case', () => {
  let gymsRepository: GymsRepository;
  let useCase: CreateGymUseCase;

  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    useCase = new CreateGymUseCase(gymsRepository);
  });

  it('should be able to register', async () => {
    const { gym } = await useCase.execute({
      title: 'js-gym',
      description: 'nwm-gym',
      phone: '19983435514',
      latitude: -22.4583086,
      longitude: -47.0723589,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
