import { hash } from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository';

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export async function registerUseCase({
  email,
  name,
  password,
}: RegisterUseCaseRequest) {
  const prismaUsersRepository = new PrismaUsersRepository();

  const passwordHash = await hash(password, 6);

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userWithSameEmail) {
    throw new Error('E-mail already registered');
  }

  await prismaUsersRepository.create({
    email,
    name,
    password_hash: passwordHash,
  });
}
