import petData from "../../data/petData.json";
import { petFixture } from "../../fixtures/testSetup";

let responseBody;

// Test for editing a pet with SUCCESS
petFixture(
  "Edit a pet @smoke @bug",
  async ({ apiContext, requestUtils, responseUtils, petSchema, endPoints }) => {
    const { ownerId, pet } = petData.editPetSuccess;

    // Step 1: Log the request and send the PUT request
    const response = await requestUtils.putRequest(apiContext, endPoints.PET_BY_PET_ID, pet, {
      ownerId,
      petId: pet.id,
    });

    // Step 2: Validate the response status code
    responseBody = await responseUtils.validateResponse(response, 204);

    // Step 3: Validate the response body
    await responseUtils.validatePetResponseBody(
      responseBody,
      "",
      parseInt(pet.id),
      pet.name,
      pet.birthDate,
      parseInt(pet.typeId),
      "cat"
    );

    // Step 4: Validate the response body schema against pet schema
    await responseUtils.validateResponseBodySchema(responseBody, petSchema);
  }
);

// Test for editing a pet without name - BAD REQUEST
petFixture(
  "Edit a pet without name - BAD REQUEST @bug",
  async ({ apiContext, requestUtils, responseUtils, errorSchema, endPoints }) => {
    const { ownerId, pet } = petData.editPetWithoutName;

    // Step 1: Log the request and send the PUT request
    const response = await requestUtils.putRequest(apiContext, endPoints.PET_BY_PET_ID, pet, {
      ownerId,
      petId: pet.id,
    });

    // Step 2: Validate the BAD REQUEST response
    responseBody = await responseUtils.validateBadRequestResponse(response, 400);

    // Step 3: Validate missing fields in response
    await responseUtils.validateMissingFieldError(responseBody, "name");

    // Step 4: Validate the response body schema against error schema
    await responseUtils.validateResponseBodySchema(responseBody, errorSchema);
  }
);

// Test for editing a pet with empty body - SERVER ERROR
petFixture(
  "Edit a pet with empty body - SERVER ERROR",
  async ({ apiContext, requestUtils, responseUtils, errorSchema, endPoints }) => {
    const { ownerId, petId, pet } = petData.editPetEmptyBody;

    // Step 1: Log the request and send the PUT request
    const response = await requestUtils.putRequest(apiContext, endPoints.PET_BY_PET_ID, pet, {
      ownerId,
      petId,
    });

    // Step 2: Validate the INTERNAL SERVER ERROR response
    responseBody = await responseUtils.validateInternalServerErrorResponse(response, 500);

    // Step 3: Validate the response body schema against error schema
    await responseUtils.validateResponseBodySchema(responseBody, errorSchema);
  }
);

// Test for editing a pet with empty ownerID - NOT FOUND
petFixture(
  "Edit a pet with empty ownerID - NOT FOUND",
  async ({ apiContext, requestUtils, responseUtils, errorSchema, endPoints }) => {
    const { ownerId, pet } = petData.editPetEmptyOwnerID;

    // Step 1: Log the request and send the PUT request
    const response = await requestUtils.putRequest(apiContext, endPoints.PET_BY_PET_ID, pet, {
      ownerId,
      petId: pet.id,
    });

    // Step 2: Validate the NOT FOUND response
    responseBody = await responseUtils.validateNotFoundResponse(response, 400);

    // Step 3: Validate the response body schema against error schema
    await responseUtils.validateResponseBodySchema(responseBody, errorSchema);
  }
);

// Test for editing a pet with empty petID - Method Not Allowed
petFixture(
  "Edit a pet with empty petID - Method Not Allowed",
  async ({ apiContext, requestUtils, responseUtils, errorSchema, endPoints }) => {
    const { ownerId, pet } = petData.editPetEmptyPetID;

    // Step 1: Log the request and send the PUT request
    const response = await requestUtils.putRequest(apiContext, endPoints.PET_BY_PET_ID, pet, {
      ownerId,
      petId: pet.id,
    });

    // Step 2: Validate the Method Not Allowed response
    responseBody = await responseUtils.validateMethodNotAllowedResponse(response, 405);

    // Step 3: Validate the response body schema against error schema
    await responseUtils.validateResponseBodySchema(responseBody, errorSchema);
  }
);

// Test for editing a pet with NOT FOUND ownerID
petFixture(
  "Edit a pet with NOT FOUND ownerID - NOT FOUND @bug",
  async ({ apiContext, requestUtils, responseUtils, errorSchema, endPoints }) => {
    const { ownerId, pet } = petData.editPetOwnerNotFound;

    // Step 1: Log the request and send the PUT request
    const response = await requestUtils.putRequest(apiContext, endPoints.PET_BY_PET_ID, pet, {
      ownerId,
      petId: pet.id,
    });

    // Step 2: Validate the NOT FOUND response
    responseBody = await responseUtils.validateNotFoundResponse(response, 404);

    // Step 3: Validate the response body schema against error schema
    await responseUtils.validateResponseBodySchema(responseBody, errorSchema);
  }
);

// Test for editing a pet with NOT FOUND petID
petFixture(
  "Edit a pet with NOT FOUND petID - NOT FOUND @bug",
  async ({ apiContext, requestUtils, responseUtils, errorSchema, endPoints }) => {
    const { ownerId, pet } = petData.editPetPetNotFound;

    // Step 1: Log the request and send the PUT request
    const response = await requestUtils.putRequest(apiContext, endPoints.PET_BY_PET_ID, pet, {
      ownerId,
      petId: pet.id,
    });

    // Step 2: Validate the NOT FOUND response
    responseBody = await responseUtils.validateNotFoundResponse(response, 404);

    // Step 3: Validate the response body schema against error schema
    await responseUtils.validateResponseBodySchema(responseBody, errorSchema);
  }
);
