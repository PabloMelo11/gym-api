import { describe, it, expect, beforeEach } from 'vitest';
import { AuthenticateUseCase } from './authenticate';
import { compare, hash } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UsersRepository } from '@/repositories/users-repository';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

describe('Authenticate Use Case', () => {
  let usersRepository: UsersRepository;
  let useCase: AuthenticateUseCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    useCase = new AuthenticateUseCase(usersRepository);
  });

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    });

    const { user } = await useCase.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      useCase.execute({
        email: 'johndoe@example.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    });

    await expect(() =>
      useCase.execute({
        email: 'johndoe@example.com',
        password: '1234567',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
