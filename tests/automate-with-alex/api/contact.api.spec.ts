import { test, expect } from '@fixtures/automate-with-alex';
import { aContactMessage } from '@data/builders/ContactMessageBuilder';
import { rejectedContactPayloads } from '@data/cases/contact-validation';
import { Tag } from '@support/tags';

test.describe('POST /api/contact', { tag: Tag.api }, () => {
  test(
    'silently accepts spam bot submissions without sending them',
    { tag: Tag.smoke },
    async ({ contactApi }) => {
      const response = await contactApi.send(aContactMessage().fromSpamBot().build());

      expect(response.status).toBe(200);
      expect(response.body.ok).toBe(true);
    },
  );

  for (const { scenario, payload, error } of rejectedContactPayloads) {
    test(`rejects ${scenario}`, { tag: Tag.regression }, async ({ contactApi }) => {
      const response = await contactApi.send(payload);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ ok: false, error: expect.stringMatching(error) });
    });
  }

  test('rejects malformed JSON', { tag: Tag.regression }, async ({ contactApi }) => {
    const response = await contactApi.sendRaw('{"name": ');

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid JSON');
  });
});
