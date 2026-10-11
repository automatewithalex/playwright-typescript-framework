import { faker } from '@faker-js/faker';
import { env } from '@config/env';

export const fakerSeed = env.fakerSeed ?? Math.floor(Math.random() * 1_000_000);

faker.seed(fakerSeed);

export { faker };
