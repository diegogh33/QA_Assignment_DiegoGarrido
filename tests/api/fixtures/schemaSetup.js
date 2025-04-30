import { test as baseTest } from "@playwright/test"; // Import Playwright's test
import ownerSchema from "../schemas/ownerSchema"; // Import your Owner schema
import petSchema from "../schemas/petSchema"; // Import your Pet schema
import restErrorSchema from "../schemas/restErrorSchema"; // Import your Error schema

// Extend Playwright's test and create schema fixtures
export const test =
  baseTest.extend <
  {
    ownerSchema,
    petSchema,
    errorSchema,
  } >
  {
    // Fixture for Owner Schema
    ownerSchema: async ({}, use) => {
      await use(ownerSchema);
    },

    // Fixture for Pet Schema
    petSchema: async ({}, use) => {
      await use(petSchema);
    },

    // Fixture for Error Schema
    errorSchema: async ({}, use) => {
      await use(restErrorSchema);
    },
  };
