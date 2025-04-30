import ownerData from "../../data/ownerData.json";
import { ownerFixture } from "../../fixtures/testSetup";

// Test for editing an existing owner with SUCCESS
ownerFixture(
  "Edit an owner @smoke",
  async ({ apiContext, requestUtils, responseUtils, ownerSchema, endPoints }) => {
    const requestBody = ownerData.editOwnerSuccess;

    // Step 1: Make PUT request to edit the owner
    const response = await requestUtils.putRequest(
      apiContext,
      endPoints.OWNER_BY_ID,
      requestBody,
      { ownerId: requestBody.ownerId }
    );

    // Step 2: Validate the response status code
    const responseBody = await responseUtils.validateResponse(response, 200);

    // Step 3: Validate the response body data
    await responseUtils.validateOwnerResponseBody(
      responseBody,
      requestBody.firstName,
      requestBody.lastName,
      requestBody.address,
      requestBody.city,
      requestBody.telephone
    );

    // Step 4: Validate the response body schema against owner schema
    await responseUtils.validateResponseBodySchema(responseBody, ownerSchema);
  }
);

// Test for editing an existing owner with BAD REQUEST (Missing FirstName)
ownerFixture(
  "Edit an owner without firstName -  BAD REQUEST",
  async ({ apiContext, requestUtils, responseUtils, errorSchema, endPoints }) => {
    const requestBody = ownerData.editOwnerMissingFirstName; // Use data from JSON

    // Step 1: Make PUT request to edit the owner with invalid data (missing fields)
    const response = await requestUtils.putRequest(
      apiContext,
      endPoints.OWNER_BY_ID,
      requestBody,
      { ownerId: requestBody.ownerId }
    );

    // Step 2: Validate the BAD REQUEST response and body
    const responseBody = await responseUtils.validateBadRequestResponse(response, 400);

    // Step 3: Additional assertions for missing firstname and lastname
    await responseUtils.validateMissingFieldError(responseBody, "firstName");

    // Step 4: Validate the error response body schema against error schema
    await responseUtils.validateResponseBodySchema(responseBody, errorSchema);
  }
);

// Test for editing an existing owner with BAD REQUEST (Missing LastName)
ownerFixture(
  "Edit an owner without lastName -  BAD REQUEST",
  async ({ apiContext, requestUtils, responseUtils, errorSchema, endPoints }) => {
    const requestBody = ownerData.editOwnerMissingLastName; // Use data from JSON

    // Step 1: Make PUT request to edit the owner with invalid data (missing fields)
    const response = await requestUtils.putRequest(
      apiContext,
      endPoints.OWNER_BY_ID,
      requestBody,
      { ownerId: requestBody.ownerId }
    );

    // Step 2: Validate the BAD REQUEST response and body
    const responseBody = await responseUtils.validateBadRequestResponse(response, 400);

    // Step 3: Additional assertions for missing firstname and lastname
    await responseUtils.validateMissingFieldError(responseBody, "lastName");

    // Step 4: Validate the error response body schema against error schema
    await responseUtils.validateResponseBodySchema(responseBody, errorSchema);
  }
);

// Test for editing an owner with Empty Body - BAD REQUEST
ownerFixture(
  "Edit an owner with Empty Body - BAD REQUEST",
  async ({ apiContext, requestUtils, responseUtils, errorSchema, endPoints }) => {
    const ownerId = ownerData.OwnerForEdit.ownerId; // Use data from JSON

    // Step 1: Make PUT request to edit the owner with an empty body
    const response = await requestUtils.putRequest(
      apiContext,
      endPoints.OWNER_BY_ID,
      {},
      { ownerId }
    );

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
  }
);

// Test for editing a non-existing owner with - Not Found
ownerFixture(
  "Edit an owner with -Not Found- Owner ID @bug",
  async ({ apiContext, requestUtils, responseUtils, errorSchema, endPoints }) => {
    const requestBody = ownerData.editOwnerSuccess; // Use the success body but with a not found ID
    const ownerId = ownerData.OwnerNotFound.ownerId;

    // Step 1: Make PUT request with not found ID
    const response = await requestUtils.putRequest(
      apiContext,
      endPoints.OWNER_BY_ID,
      requestBody,
      { ownerId }
    );

    // Step 2: Validate the NOT FOUND response and body
    const responseBody = await responseUtils.validateNotFoundResponse(response, 404);

    // Step 3: Validate the error response body schema against error schema
    await responseUtils.validateResponseBodySchema(responseBody, errorSchema);
  }
);

// Test for editing an owner with Invalid ID - BAD REQUEST
ownerFixture(
  "Edit an owner with Invalid Owner ID - BAD REQUEST",
  async ({ apiContext, requestUtils, responseUtils, errorSchema, endPoints }) => {
    const requestBody = ownerData.editOwnerSuccess; // Use the success body
    const ownerId = ownerData.OwnerInvalidID.ownerId; // Use invalid ID from JSON

    // Step 1: Make PUT request to edit the owner with invalid ID
    const response = await requestUtils.putRequest(
      apiContext,
      endPoints.OWNER_BY_ID,
      requestBody,
      { ownerId }
    );

    // Step 2: Validate the BAD REQUEST response and body
    const responseBody = await responseUtils.validateBadRequestResponse(response, 400);

    // Step 3: Validate the error response body schema against error schema
    await responseUtils.validateResponseBodySchema(responseBody, errorSchema);
  }
);

// Test for editing an owner with Empty Owner ID - BAD REQUEST
ownerFixture(
  "Edit an owner with Empty Owner ID - BAD REQUEST",
  async ({ apiContext, requestUtils, responseUtils, errorSchema, endPoints }) => {
    const requestBody = ownerData.editOwnerSuccess; // Use the success body
    const ownerId = ownerData.OwnerEmptyID.ownerId; // Use empty ID from JSON

    // Step 1: Make PUT request to edit the owner with empty ID
    const response = await requestUtils.putRequest(
      apiContext,
      endPoints.OWNER_BY_ID,
      requestBody,
      { ownerId }
    );

    // Step 2: Validate the BAD REQUEST response and body
    const responseBody = await responseUtils.validateMethodNotAllowedResponse(response, 405);

    // Step 3: Validate the error response body schema against error schema
    await responseUtils.validateResponseBodySchema(responseBody, errorSchema);
  }
);
