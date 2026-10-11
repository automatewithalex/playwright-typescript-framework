import type { Locator, Page } from '@playwright/test';
import type { ContactMessage } from '@data/models/contact-message';
import { Component } from '../Component';

export class ContactForm extends Component {
  readonly name: Locator;
  readonly email: Locator;
  readonly company: Locator;
  readonly service: Locator;
  readonly details: Locator;
  readonly timeline: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;
  readonly errorMessage: Locator;
  readonly selectedServiceNotice: Locator;

  constructor(page: Page) {
    super(page.getByRole('form', { name: 'Requirements form' }));
    this.name = this.root.getByLabel('Name', { exact: true });
    this.email = this.root.getByRole('textbox', { name: 'Email' });
    this.company = this.root.getByLabel('Company');
    this.service = this.root.getByLabel('Service needed');
    this.details = this.root.getByLabel(/Your requirements/);
    this.timeline = this.root.getByLabel(/Timeline/);
    this.submitButton = this.root.getByRole('button', { name: /send your requirements/i });
    this.successMessage = this.root.getByRole('status').filter({ hasText: 'Message received' });
    this.errorMessage = this.root.getByRole('alert');
    this.selectedServiceNotice = this.root.getByRole('status').filter({ hasText: 'Selected:' });
  }

  async fill(message: ContactMessage): Promise<void> {
    await this.name.fill(message.name);
    await this.email.fill(message.email);
    if (message.company) await this.company.fill(message.company);
    if (message.service) await this.service.selectOption(message.service);
    if (message.timeline) await this.timeline.selectOption(message.timeline);
    await this.details.fill(message.message);
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }

  async send(message: ContactMessage): Promise<void> {
    await this.fill(message);
    await this.submit();
  }

  serviceOptions(): Promise<string[]> {
    return this.service.locator('option:not([disabled])').allInnerTexts();
  }
}
