import { test as baseTest } from "@playwright/test";
import ownerSchema from "../schemas/ownerSchema";
import petSchema from "../schemas/petSchema";
import restErrorSchema from "../schemas/restErrorSchema";

/*
  This file sets up reusable "fixtures" for API schema validation in tests.

  A fixture is a value or helper you can use inside your tests, like a shared object.
  Here, we are creating fixtures that provide access to JSON schemas for validating API responses.

  Why this is useful:
  - It helps ensure that the API returns the expected structure and data types.
  - It keeps the test files clean by moving schema loading to this setup file.
  - It avoids repeating the same import code in every test file.

  Once set up, you can access these schemas directly in your tests using:
    test("example", async ({ ownerSchema }) => { ... })
*/

export const test = baseTest.extend({
  // Fixture for Owner Schema: Provides the Owner schema for API response validation.
  ownerSchema: async ({}, use) => {
    await use(ownerSchema);
  },

  // Fixture for Pet Schema: Provides the Pet schema for API response validation.
  petSchema: async ({}, use) => {
    await use(petSchema);
  },

  // Fixture for Error Schema: Provides the error schema for API error response validation.
  errorSchema: async ({}, use) => {
    await use(restErrorSchema);
  },
});
