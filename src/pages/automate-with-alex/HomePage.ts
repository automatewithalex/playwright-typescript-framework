import type { Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { ContactForm } from '@components/automate-with-alex/ContactForm';
import { Faq } from '@components/automate-with-alex/Faq';
import { MobileMenu } from '@components/automate-with-alex/MobileMenu';
import { Navigation } from '@components/automate-with-alex/Navigation';

export class HomePage extends BasePage {
  protected readonly path = '/';

  readonly header: Locator;
  readonly heading: Locator;
  readonly bookCallLink: Locator;
  readonly navigation: Navigation;
  readonly mobileMenu: MobileMenu;
  readonly contactForm: ContactForm;
  readonly faq: Faq;

  constructor(page: Page) {
    super(page);
    this.header = page.getByRole('banner');
    this.heading = page.getByRole('heading', { level: 1 });
    this.bookCallLink = page.getByRole('link', { name: /book an intro call/i }).first();
    this.navigation = new Navigation(page);
    this.mobileMenu = new MobileMenu(page);
    this.contactForm = new ContactForm(page);
    this.faq = new Faq(page);
  }

  section(id: string): Locator {
    return this.page.locator(`main section#${id}`);
  }

  sectionIds(): Promise<string[]> {
    return this.page.locator('main section[id]').evaluateAll((sections) => sections.map((s) => s.id));
  }

  cta(name: string | RegExp): Locator {
    return this.page.getByRole('link', { name });
  }

  async openSection(id: string): Promise<void> {
    await this.page.goto(`${this.path}#${id}`);
  }
}
