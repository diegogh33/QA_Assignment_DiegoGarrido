import { test, expect, APIRequestContext } from "@playwright/test";
import RequestUtils from "../utils/requestUtils"; // Imports the utility class for making API requests
import ResponseUtils from "../utils/responseUtils"; // Imports the utility class for validating API responses
import { EndPoints } from "../utils/endpoints"; // Imports the object containing API endpoint definitions
import ownerSchema from "../schemas/ownerSchema.json"; // Imports the JSON schema for owner objects
import petSchema from "../schemas/petSchema.json";   // Imports the JSON schema for pet objects
import restErrorSchema from "../schemas/restErrorSchema.json"; // Imports the JSON schema for REST error responses

// Defines a base fixture that extends the default Playwright test functionality
const baseFixture = test.extend({
  // Creates a fixture named 'apiContext' which provides an isolated API request context
  apiContext: async ({ playwright }, use) => {
    // Creates a new API request context using the Playwright API
    const apiContext = await playwright.request.newContext();
    // 'use' is a function that yields the created apiContext to the test
    await use(apiContext);
    // After the test runs, this part (if any) would execute for cleanup
  },
  // Creates a fixture named 'requestUtils' which provides an instance of the RequestUtils class
  requestUtils: async ({ apiContext }, use) => {
    // Creates a new instance of RequestUtils, passing the apiContext to its constructor
    await use(new RequestUtils(apiContext));
    // After the test runs, this part (if any) would execute for cleanup
  },
  // Creates a fixture named 'responseUtils' which provides an instance of the ResponseUtils class
  responseUtils: async ({ apiContext }, use) => {
    // Creates a new instance of ResponseUtils
    await use(new ResponseUtils());
    // After the test runs, this part (if any) would execute for cleanup
  },
  // Creates a fixture named 'endPoints' which provides the EndPoints object
  endPoints: async ({}, use) => {
    // Passes the EndPoints object directly to the test
    await use(EndPoints);
    // After the test runs, this part (if any) would execute for cleanup
  },
  // Creates a fixture named 'ownerSchema' which provides the owner schema
  ownerSchema: async ({}, use) => {
    // Passes the imported owner schema JSON object to the test
    await use(ownerSchema);
    // After the test runs, this part (if any) would execute for cleanup
  },
  // Creates a fixture named 'petSchema' which provides the pet schema
  petSchema: async ({}, use) => {
    // Passes the imported pet schema JSON object to the test
    await use(petSchema);
    // After the test runs, this part (if any) would execute for cleanup
  },
  // Creates a fixture named 'errorSchema' which provides the error schema
  errorSchema: async ({}, use) => {
    // Passes the imported REST error schema JSON object to the test
    await use(restErrorSchema);
    // After the test runs, this part (if any) would execute for cleanup
  },
});

// Creates a new fixture named 'ownerFixture' by extending the 'baseFixture'.
// Currently, it doesn't add any new functionality but can be extended further for owner-specific setup.
export const ownerFixture = baseFixture.extend({});
export const petFixture = baseFixture.extend({});

// Exports the 'expect' function from Playwright for assertions in tests
export { expect };

// Exports the 'requestUtils' fixture so it can be imported and used in tests
export const requestUtils = baseFixture.requestUtils;

// Exports the 'responseUtils' fixture so it can be imported and used in tests
export const responseUtilsFixture = baseFixture.responseUtils;

// Exports the 'endPoints' fixture so it can be imported and used in tests
export const endPoints = baseFixture.endPoints;

// Exports the 'ownerSchema' fixture so it can be imported and used in tests
export const ownerSchemaFixture = baseFixture.ownerSchema;

// Exports the 'petSchema' fixture so it can be imported and used in tests
export const petSchemaFixture = baseFixture.petSchema;

// Exports the 'errorSchema' fixture so it can be imported and used in tests
export const errorSchemaFixture = baseFixture.errorSchema;
