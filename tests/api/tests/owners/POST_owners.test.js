import ownerData from "../../data/ownerData.json";
import { test } from "../../fixtures/testSetup";

// Test for creating a new owner with SUCCESS
test("Create a new pet owner @smoke @bug", async ({
  apiContext,
  requestUtils,
  responseUtils,
  ownerSchema,
  endPoints,
}) => {
  const requestBody = ownerData.createOwnerSuccess;

  // Step 1: Log the request and send the POST request
  const response = await requestUtils.postRequest(apiContext, endPoints.OWNERS, requestBody);

  // Step 2: Validate the response status code and body
  const responseBody = await responseUtils.validateResponse(response, 201);

  // // Step 3: Validate the response body content against data from the JSON file
  // await responseUtils.validateOwnerResponseBody(
  //   responseBody,
  //   requestBody.firstName, // Fetching firstName from the requestBody JSON
  //   requestBody.lastName, // Fetching lastName from the requestBody JSON
  //   requestBody.address, // Fetching address from the requestBody JSON
  //   requestBody.city, // Fetching city from the requestBody JSON
  //   requestBody.telephone // Fetching telephone from the requestBody JSON
  // );

  // // Step 4: Validate the response body schema
  // await responseUtils.validateResponseBodySchema(responseBody, ownerSchema);
});

// Test for creating a new owner with BAD REQUEST - Missing FirstName
test("Create a new pet owner without firstName - BAD REQUEST", async ({
  apiContext,
  requestUtils,
  responseUtils,
  errorSchema,
  endPoints,
}) => {
  const requestBody = ownerData.createOwnerWithoutFirstName;

  // Step 1: Log the request and send the POST request
  const response = await requestUtils.postRequest(apiContext, endPoints.OWNERS, requestBody);

  // Step 2: Validate the BAD REQUEST response and body
  const responseBody = await responseUtils.validateBadRequestResponse(response, 400);

  // Step 3: Additional assertions for missing firstName
  await responseUtils.validateMissingFieldError(responseBody, "firstName");

  // Step 4: Validate the error response body schema against error schema
  await responseUtils.validateResponseBodySchema(responseBody, errorSchema);
});

// Test for creating a new owner with BAD REQUEST - Missing LastName
test("Create a new pet owner without lastName - BAD REQUEST", async ({
  apiContext,
  requestUtils,
  responseUtils,
  errorSchema,
  endPoints,
}) => {
  const requestBody = ownerData.createOwnerWithoutLastName;

  // Step 1: Log the request and send the POST request
  const response = await requestUtils.postRequest(apiContext, endPoints.OWNERS, requestBody);

  // Step 2: Validate the BAD REQUEST response and body
  const responseBody = await responseUtils.validateBadRequestResponse(response, 400);

  // Step 3: Additional assertions for missing lastName
  await responseUtils.validateMissingFieldError(responseBody, "lastName");

  // Step 4: Validate the error response body schema against error schema
  await responseUtils.validateResponseBodySchema(responseBody, errorSchema);
});

// Test for creating a new owner with BAD REQUEST - Missing entire body
test("Create a new pet owner without body - BAD REQUEST", async ({
  apiContext,
  requestUtils,
  responseUtils,
  errorSchema,
  endPoints,
}) => {
  const requestBody = ownerData.createOwnerEmptyBody;

  // Step 1: Log the request and send the POST request
  const response = await requestUtils.postRequest(apiContext, endPoints.OWNERS, requestBody);

  // Step 2: Validate the BAD REQUEST response and body
  const responseBody = await responseUtils.validateBadRequestResponse(response, 400);

  // Step 3: Additional assertions for missing fields
  await responseUtils.validateMissingFieldError(responseBody, "firstName");
  await responseUtils.validateMissingFieldError(responseBody, "lastName");
  await responseUtils.validateMissingFieldError(responseBody, "address");
  await responseUtils.validateMissingFieldError(responseBody, "city");
  await responseUtils.validateMissingFieldError(responseBody, "telephone");

  // Step 4: Validate the error response body schema against error schema

  await responseUtils.validateResponseBodySchema(responseBody, errorSchema);
});
