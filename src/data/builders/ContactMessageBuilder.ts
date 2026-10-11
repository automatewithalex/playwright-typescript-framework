import { faker } from '../faker';
import type { ContactMessage, Service } from '../models/contact-message';

export class ContactMessageBuilder {
  private message: ContactMessage = {
    name: faker.person.fullName(),
    email: faker.internet.email({ provider: 'example.com' }).toLowerCase(),
    company: faker.company.name(),
    service: 'embedded-engineer',
    timeline: 'this-month',
    message: faker.lorem.sentences(2),
  };

  with(overrides: Partial<ContactMessage>): this {
    this.message = { ...this.message, ...overrides };
    return this;
  }

  forService(service: Service): this {
    return this.with({ service });
  }

  withInvalidEmail(): this {
    return this.with({ email: 'not-an-email' });
  }

  withoutRequiredFields(): this {
    return this.with({ name: '', email: '', message: '' });
  }

  fromSpamBot(): this {
    return this.with({ website: faker.internet.url() });
  }

  build(): ContactMessage {
    return { ...this.message };
  }
}

export const aContactMessage = (): ContactMessageBuilder => new ContactMessageBuilder();
