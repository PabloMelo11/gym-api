import { describe, it, expect, beforeEach } from 'vitest';
import { GetUserProfileUseCase } from './get-user-profile';
import { hash } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UsersRepository } from '@/repositories/users-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

describe('Get User Profile Use Case', () => {
  let usersRepository: UsersRepository;
  let useCase: GetUserProfileUseCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    useCase = new GetUserProfileUseCase(usersRepository);
  });

  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    });

    const { user } = await useCase.execute({ userId: createdUser.id });

    expect(user.name).toEqual('John Doe');
  });

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      useCase.execute({ userId: 'non-existing-id' })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
