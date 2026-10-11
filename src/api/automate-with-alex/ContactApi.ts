import { z } from 'zod';
import type { ContactMessage } from '@data/models/contact-message';
import { ApiClient } from '../ApiClient';

const contactResponseSchema = z.object({
  ok: z.boolean(),
  error: z.string().optional(),
});

export class ContactApi extends ApiClient {
  async send(message: Partial<ContactMessage> | Record<string, unknown>) {
    return this.parse(await this.request.post('/api/contact', { data: message }), contactResponseSchema);
  }

  async sendRaw(body: string) {
    const response = await this.request.post('/api/contact', {
      data: Buffer.from(body),
      headers: { 'Content-Type': 'application/json' },
    });
    return this.parse(response, contactResponseSchema);
  }
}
