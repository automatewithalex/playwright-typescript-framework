import { z } from 'zod';
import { ApiClient } from '../ApiClient';

const configSchema = z.object({ mode: z.enum(['manual', 'stripe']) });

export class BillingApi extends ApiClient {
  async config() {
    return this.parse(await this.request.get('/api/billing/config'), configSchema);
  }
}
