import 'dotenv/config';
import { z } from 'zod';
import { environments } from './environments';

const schema = z.object({
  TEST_ENV: z.enum(['production', 'local']).default('production'),
  TB_TEST_EMAIL: z.email().optional(),
  TB_TEST_PASSWORD: z.string().min(1).optional(),
  FAKER_SEED: z.coerce.number().int().optional(),
});

const result = schema.safeParse(process.env);

if (!result.success) {
  throw new Error(`Invalid test environment variables:\n${z.prettifyError(result.error)}`);
}

const vars = result.data;

export const env = {
  name: vars.TEST_ENV,
  urls: environments[vars.TEST_ENV],
  fakerSeed: vars.FAKER_SEED,
  testBlocksUser:
    vars.TB_TEST_EMAIL && vars.TB_TEST_PASSWORD
      ? { email: vars.TB_TEST_EMAIL, password: vars.TB_TEST_PASSWORD }
      : undefined,
};
