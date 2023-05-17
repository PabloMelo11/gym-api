import { User, Prisma } from '@prisma/client';
import { UsersRepository } from '../users-repository';

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = [];

  async findByEmail(email: string) {
    const user = this.users.find((item) => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: 'user-id',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    };

    this.users.push(user);

    return user;
  }

  async findById(userId: string): Promise<User | null> {
    const user = this.users.find((item) => item.id === userId);

    if (!user) {
      return null;
    }

    return user;
  }
}
