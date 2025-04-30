import petData from "../../data/petData.json";
import { petFixture } from "../../fixtures/testSetup";

let responseBody;

// Test for creating a new pet with SUCCESS
petFixture(
  "Create a new pet @smoke @bug",
  async ({ apiContext, requestUtils, responseUtils, petSchema, endPoints }) => {
    const { ownerId, pet } = petData.createPetSuccess; 

    // Step 1: Log the request and send the POST request
    const response = await requestUtils.postRequest(
      apiContext,
      endPoints.PET_BY_OWNER_ID,
      pet,
      { ownerId }
    );

    // Step 2: Validate the response status code
    responseBody = await responseUtils.validateResponse(response, 204);

    // Step 3: Validate the response body content
    await responseUtils.validatePetResponseBody(
      responseBody,
      "",
      2,
      "leooo",
      "2010-09-07",
      1,
      "cat"
    );

    // Step 4: Validate the response schema
    await responseUtils.validateResponseBodySchema(responseBody, petSchema);
  }
);

// Test for creating a new pet without name - BAD REQUEST
petFixture(
  "Create a new pet without name - BAD REQUEST @bug",
  async ({ apiContext, requestUtils, responseUtils, errorSchema, endPoints }) => {
    const { ownerId, pet } = petData.createPetWithoutName; 

    // Step 1: Log the request and send the POST request
    const response = await requestUtils.postRequest(
      apiContext,
      endPoints.PET_BY_OWNER_ID,
      pet,
      { ownerId }
    );

    // Step 2: Validate the BAD REQUEST response
    responseBody = await responseUtils.validateBadRequestResponse(response, 400);

    // Step 3: Validate missing name field in the response
    await responseUtils.validateMissingFieldError(responseBody, "name");

    // Step 4: Validate the response schema
    await responseUtils.validateResponseBodySchema(responseBody, errorSchema);
  }
);

// Test for creating a pet with empty body request - Server Error
petFixture(
  "Create a new pet with empty body request - Server Error",
  async ({ apiContext, requestUtils, responseUtils, errorSchema, endPoints }) => {
    const { ownerId } = petData.createPetEmptyBody; 

    // Step 1: Log the request and send the POST request
    const response = await requestUtils.postRequest(
      apiContext,
      endPoints.PET_BY_OWNER_ID,
      {},
      { ownerId }
    );

    // Step 2: Validate the Server Error response
    responseBody = await responseUtils.validateInternalServerErrorResponse(response, 500);

    // Step 3: Validate the response schema
    await responseUtils.validateResponseBodySchema(responseBody, errorSchema);
  }
);

// Test for creating a pet for NOT FOUND ownerID
petFixture(
  "Create a new pet for NOT FOUND ownerID @bug",
  async ({ apiContext, requestUtils, responseUtils, errorSchema, endPoints }) => {
    const { ownerId, pet } = petData.createPetOwnerNotFound; 

    // Step 1: Log the request and send the POST request
    const response = await requestUtils.postRequest(
      apiContext,
      endPoints.PET_BY_OWNER_ID,
      pet,
      { ownerId }
    );

    // Step 2: Validate the NOT FOUND response
    responseBody = await responseUtils.validateNotFoundResponse(response, 404);

    // Step 3: Validate the response schema
    await responseUtils.validateResponseBodySchema(responseBody, errorSchema);
  }
);

// Test for creating a pet for Invalid ownerID - BAD REQUEST
petFixture(
  "Create a new pet for Invalid ownerID - BAD REQUEST",
  async ({ apiContext, requestUtils, responseUtils, errorSchema, endPoints }) => {
    const { ownerId, pet } = petData.createPetInvalidOwnerID; 

    // Step 1: Log the request and send the POST request
    const response = await requestUtils.postRequest(
      apiContext,
      endPoints.PET_BY_OWNER_ID,
      pet,
      { ownerId }
    );

    // Step 2: Validate the BAD REQUEST response
    responseBody = await responseUtils.validateBadRequestResponse(response, 400);

    // Step 3: Validate the response schema
    await responseUtils.validateResponseBodySchema(responseBody, errorSchema);
  }
);

// Test for creating a pet for Empty ownerID - Method Not Allowed
petFixture(
  "Create a new pet for Empty ownerID - Method Not Allowed",
  async ({ apiContext, requestUtils, responseUtils, errorSchema, endPoints }) => {
    const { ownerId, pet } = petData.createPetEmptyOwnerID; 

    // Step 1: Log the request and send the POST request
    const response = await requestUtils.postRequest(
      apiContext,
      endPoints.PET_BY_OWNER_ID,
      pet,
      { ownerId }
    );

    // Step 2: Validate the Method Not Allowed response
    responseBody = await responseUtils.validateMethodNotAllowedResponse(response, 405);

    // Step 3: Validate the response schema
    await responseUtils.validateResponseBodySchema(responseBody, errorSchema);
  }
);
