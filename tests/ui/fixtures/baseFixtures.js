const { test, expect } = require("@playwright/test");
import POManager from "../pages/POManager";

// Base fixture with common initialization (URL navigation and POManager)
// This fixture sets up the basic testing environment.
// test.extend:  Playwright's mechanism for creating reusable test setups.
const baseFixture = test.extend({
  pm: async ({ page }, use) => {
    // Create POManager instance
    const poManager = new POManager(page);
    // Navigate to the base URL
    await page.goto("/");
    // Assert page title
    await expect(page).toHaveTitle(/PetClinic/);
    // Provide POManager to tests
    await use(poManager);
  },
});

// Specific fixture for pet tests (extends from baseFixture and includes navigation to All Owners)
exports.petFixture = baseFixture.extend({
  petSetup: async ({ pm }, use) => {
    const navBarPage = pm.getNavBarPage();
    await navBarPage.goToAllOwnersPage();
    await use(); // Provides POManager, page on All Owners
  },
});

// Specific fixture for owner tests
exports.ownersFixture = baseFixture.extend({
  ownersSetup: async ({ pm }, use) => {
    const navBarPage = pm.getNavBarPage();
    await navBarPage.goToAllOwnersPage();
    await use(); // Provides POManager, page on All Owners
  },
});

// Specific fixture for register tests
exports.registerFixture = baseFixture.extend({
  registerSetup: async ({ pm }, use) => {
    const navBarPage = pm.getNavBarPage();
    await navBarPage.goToRegisterOwnersPage();
    await use(); // Provides POManager, page on Register Owners
  },
});
