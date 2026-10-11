import { test, expect } from '@fixtures/automate-with-alex';
import { aContactMessage } from '@data/builders/ContactMessageBuilder';
import { serviceCtas, services } from '@data/static/automate-with-alex';
import { mockContactApi } from '@mocks/contact-api';
import { Tag } from '@support/tags';

test.describe('Contact form', { tag: Tag.ui }, () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.openSection('contact');
  });

  test('sends the filled-in requirements and confirms', { tag: Tag.smoke }, async ({ homePage, page }) => {
    const sent = await mockContactApi(page);
    const message = aContactMessage().forService('project-delivery').build();

    await homePage.contactForm.send(message);

    await expect(homePage.contactForm.successMessage).toBeVisible();
    expect(sent).toEqual([
      expect.objectContaining({ name: message.name, email: message.email, service: 'project-delivery' }),
    ]);
  });

  test('offers the agreed list of services', { tag: Tag.regression }, async ({ homePage }) => {
    expect(await homePage.contactForm.serviceOptions()).toEqual(services.map((s) => s.label));
  });

  for (const { cta, service } of serviceCtas) {
    test(
      `"${cta.source}" call to action preselects ${service}`,
      { tag: Tag.regression },
      async ({ homePage }) => {
        await homePage.open();
        await homePage.cta(cta).click();

        await expect(homePage.contactForm.service).toHaveValue(service);
        await expect(homePage.contactForm.selectedServiceNotice).toBeVisible();
      },
    );
  }

  test(
    'server rejects a submission without required fields',
    { tag: Tag.regression },
    async ({ homePage }) => {
      await homePage.contactForm.send(aContactMessage().withoutRequiredFields().build());

      await expect(homePage.contactForm.errorMessage).toHaveText(
        /name, email and your requirements are required/i,
      );
    },
  );

  test('server rejects an invalid email address', { tag: Tag.regression }, async ({ homePage }) => {
    await homePage.contactForm.send(aContactMessage().withInvalidEmail().build());

    await expect(homePage.contactForm.errorMessage).toHaveText(/valid email address/i);
  });

  test(
    'explains what to do when the form is unavailable',
    { tag: Tag.regression },
    async ({ homePage, page }) => {
      await mockContactApi(page, 503, { ok: false });

      await homePage.contactForm.send(aContactMessage().build());

      await expect(homePage.contactForm.errorMessage).toContainText('not available right now');
    },
  );
});
