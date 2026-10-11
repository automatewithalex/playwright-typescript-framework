---
name: add-page-object
description: Create or extend a page object or component and expose it through fixtures. Use when a test needs a screen, form or widget that src/pages or src/components does not model yet.
---

# Add a page object

1. **Page or component?**
   - A page has its own URL: `src/pages/<app>/<Name>Page.ts`, extends `BasePage`, sets `path`.
   - A component is a part of a page (form, menu, table) that has its own behaviour or appears on several pages: `src/components/<app>/<Name>.ts`, extends `Component` and passes its root locator to `super`.
2. **Find locators** with `npx playwright codegen <url>` or the healer agent's snapshot. Priority: role + accessible name, label, placeholder, text. Scope component locators to `this.root`.
3. **Shape the class.**
   - Locators are `readonly` fields assigned in the constructor.
   - Methods describe user intent (`send(message)`, `goTo(name)`), return `Promise<void>` or a value, and never assert.
   - Parameterised locators are methods: `plan(name: string): Locator`.
   - Keep methods short; if one needs comments to be understood, split it.
4. **Compose.** Pages own their components as fields (`this.contactForm = new ContactForm(page)`).
5. **Expose it.** Add the page to the app fixture in `src/fixtures/<app>.ts`:
   ```ts
   pricingPage: async ({ page }, use) => use(new PricingPage(page)),
   ```
6. **Verify** with a test (see `write-test`) and `npm run check`.
