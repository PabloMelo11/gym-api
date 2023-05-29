import { FastifyInstance } from 'fastify';
import { verifyJWT } from '@/http/middlewares/verify-jwt';
import { register } from './register';
import { authenticate } from './authenticate';
import { profile } from './profile';
import { refreshToken } from './refresh-token';

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register);
  app.post('/sessions', authenticate);

  app.patch('/token/refresh', refreshToken);

  app.get('/me', { onRequest: [verifyJWT] }, profile);
}
