import { hash } from 'bcryptjs';
import { prisma } from '@/lib/prisma';

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private usersRepository: any) {}

  async execute({ email, name, password }: RegisterUseCaseRequest) {
    const passwordHash = await hash(password, 6);

    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userWithSameEmail) {
      throw new Error('E-mail already registered');
    }

    await this.usersRepository.create({
      email,
      name,
      password_hash: passwordHash,
    });
  }
}
