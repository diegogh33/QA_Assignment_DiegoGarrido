import ownerData from "../../data/ownerData.json";
import { test } from "../../fixtures/testSetup";

let responseBody;
// Test for getting a pet owner by ID
test("Get a pet owner by ID @smoke", async ({
  apiContext,
  requestUtils,
  responseUtils,
  ownerSchema,
  endPoints,
}) => {
  const { ownerId, firstName, lastName, address, city, telephone } = ownerData.getOwnerSuccess;

  // Make the GET request using the request utility
  const response = await requestUtils.getRequest(apiContext, endPoints.OWNER_BY_ID, {
    ownerId,
  });

  // Validate response status and content type
  responseBody = await responseUtils.validateResponse(response, 200);

  // Validate owner response fields using data from JSON
  await responseUtils.validateOwnerResponseBody(
    // Aquí sigues usando la clase directamente
    responseBody,
    firstName,
    lastName,
    address,
    city,
    telephone
  );

  // Validate schema
  await responseUtils.validateResponseBodySchema(responseBody, ownerSchema);
});

// Test for getting a NOT FOUND pet owner by ID
test("Get a pet owner by -NOT FOUND- ID @bug", async ({
  apiContext,
  requestUtils,
  responseUtils,
  errorSchema,
  endPoints,
}) => {
  const { ownerId } = ownerData.OwnerNotFound;

  // Make the GET request using the request utility
  const response = await requestUtils.getRequest(apiContext, endPoints.OWNER_BY_ID, {
    ownerId,
  });

  // Validate that response status is 404 and get response body
  responseBody = await responseUtils.validateNotFoundResponse(response, 404);

  // Validate schema for the error response
  await responseUtils.validateResponseBodySchema(responseBody, errorSchema);
});

// Test for getting a Bad Request pet owner by ID
test("Get a pet owner by Invalid ID - Bad Request", async ({
  apiContext,
  requestUtils,
  responseUtils,
  errorSchema,
  endPoints,
}) => {
  const { ownerId } = ownerData.OwnerInvalidID;

  // Make the GET request using the request utility
  const response = await requestUtils.getRequest(apiContext, endPoints.OWNER_BY_ID, {
    ownerId,
  });

  // Validate that response status is 400 and get response body
  responseBody = await responseUtils.validateBadRequestResponse(response, 400);

  // Validate schema for the error response
  await responseUtils.validateResponseBodySchema(responseBody, errorSchema);
});

// Test for getting a Server Error pet owner by Empty ID
test("Get a pet owner by Empty ID - Bad Request", async ({
  apiContext,
  requestUtils,
  responseUtils,
  errorSchema,
  endPoints,
}) => {
  const { ownerId } = ownerData.OwnerEmptyID;

  // Make the GET request using the request utility
  const response = await requestUtils.getRequest(apiContext, endPoints.OWNER_BY_ID, {
    ownerId,
  });

  // Validate that response status is 405 and get response body
  responseBody = await responseUtils.validateMethodNotAllowedResponse(response, 405);

  // Validate schema for the error response
  await responseUtils.validateResponseBodySchema(responseBody, errorSchema);
});
