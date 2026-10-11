import { z } from 'zod';
import { ApiClient } from '../ApiClient';
import { errorSchema } from '../schemas/common';

const loginSchema = z.object({
  token: z.string().min(1),
  user: z.object({ id: z.union([z.string(), z.number()]), email: z.email(), email_verified: z.boolean() }),
});

export interface Credentials {
  email: string;
  password: string;
}

export class AuthApi extends ApiClient {
  async login(credentials: Credentials) {
    return this.parse(await this.request.post('/api/auth/login', { data: credentials }), loginSchema);
  }

  async loginExpectingError(credentials: Partial<Credentials>) {
    return this.parse(await this.request.post('/api/auth/login', { data: credentials }), errorSchema);
  }
}
