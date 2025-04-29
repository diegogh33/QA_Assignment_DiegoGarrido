const { test, expect } = require("@playwright/test");
import POManager from "../pages/POManager";

// Base fixture with common initialization (URL navigation and POManager)
const baseFixture = test.extend({
  pm: async ({ page }, use) => {
    const poManager = new POManager(page);
    await page.goto("/");
    await expect(page).toHaveTitle(/PetClinic/);
    await use(poManager);
  },
});

// Specific fixture for pet tests (extends from baseFixture and includes navigation to All Owners)
exports.petFixture = baseFixture.extend({
  petSetup: async ({ pm }, use) => {
    const navBarPage = pm.getNavBarPage();
    await navBarPage.goToAllOwnersPage();
    await use({ pm }); // Provides the POManager with the page already on All Owners
  },
});

// Specific fixture for owner tests
exports.ownersFixture = baseFixture.extend({
  ownersSetup: async ({ pm }, use) => {
    const navBarPage = pm.getNavBarPage();
    await navBarPage.goToAllOwnersPage();
    await use({ pm }); // Only provides the POManager with the base URL opened
  },
});

// Specific fixture for register tests
exports.registerFixture = baseFixture.extend({
  registerSetup: async ({ pm }, use) => {
    const navBarPage = pm.getNavBarPage();
    await navBarPage.goToRegisterOwnersPage();
    await use({ pm }); // Only provides the POManager with the base URL opened
  },
});
