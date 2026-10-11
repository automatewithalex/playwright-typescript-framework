import { z } from 'zod';
import { ApiClient } from '../ApiClient';

const liveSchema = z.object({ status: z.literal('ok') });
const readySchema = z.object({ status: z.literal('ok'), database: z.literal('connected') });

export class HealthApi extends ApiClient {
  async live() {
    return this.parse(await this.request.get('/api/health'), liveSchema);
  }

  async ready() {
    return this.parse(await this.request.get('/api/health/ready'), readySchema);
  }
}
