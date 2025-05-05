import { test as base, expect } from "@playwright/test";
import RequestUtils from "../utils/requestUtils"; // Imports the utility class for making API requests
import ResponseUtils from "../utils/responseUtils"; // Imports the utility class for validating API responses
import { EndPoints } from "../utils/endpoints"; // Imports the object containing API endpoint definitions
import ownerSchemaData from "../schemas/ownerSchema.json"; // Imports the JSON schema for owner objects
import petSchemaData from "../schemas/petSchema.json"; // Imports the JSON schema for pet objects
import restErrorSchemaData from "../schemas/restErrorSchema.json"; // Imports the JSON schema for REST error responses

/*
  This file sets up shared test "fixtures" for API testing using Playwright.

  A fixture in Playwright is a reusable helper that gets injected into tests.
  Here, we define fixtures for:
    - Request and response utilities
    - API endpoints
    - JSON schemas for validating API response bodies

  Why this is useful:
  - It centralizes setup code, so test files stay clean and focused
  - It makes the API testing more consistent and easier to maintain
  - You can easily add new utilities or data sources without repeating code
*/

const baseFixture = base.extend({
  // Provides an isolated API request context for each test
  apiContext: async ({ playwright }, use) => {
    const apiContext = await playwright.request.newContext();
    await use(apiContext);
    await apiContext.dispose();
  },

  // Provides an instance of RequestUtils for making API requests
  requestUtils: async ({ apiContext }, use) => {
    await use(new RequestUtils(apiContext));
    // Cleanup (if needed)
  },

  // Provides an instance of ResponseUtils for validating API responses
  responseUtils: async ({ apiContext }, use) => {
    await use(new ResponseUtils());
    // Cleanup (if needed)
  },

  // Provides the EndPoints object containing API endpoint definitions
  endPoints: async ({}, use) => {
    await use(EndPoints);
    // No cleanup needed
  },

  // Provides the owner schema for API response validation
  ownerSchema: ({}, use) => {
    use(ownerSchemaData);
  },

  // Provides the pet schema for API response validation
  petSchema: ({}, use) => {
    use(petSchemaData);
  },

  // Provides the error schema for API error response validation
  errorSchema: ({}, use) => {
    use(restErrorSchemaData);
  },
});

// // Creates a new fixture named 'ownerFixture' by extending the 'baseFixture'.
// // Currently, it doesn't add any new functionality but can be extended further for owner-specific setup.
// export const ownerFixture = baseFixture.extend({});
// export const petFixture = baseFixture.extend({});

export const test = baseFixture;
export { expect };
