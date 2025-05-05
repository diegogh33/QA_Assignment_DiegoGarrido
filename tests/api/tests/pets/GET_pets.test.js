import petData from "../../data/petData.json";
import { test } from "../../fixtures/testSetup";

let responseBody;

// Test for getting a pet by Owner ID
test("Get a pet by Owner ID @smoke", async ({
  apiContext,
  requestUtils,
  responseUtils,
  petSchema,
  endPoints,
}) => {
  const expectedData = petData.getPetSuccess1; // Get data for this test from JSON

  // Step 1: Make GET request for a pet by owner ID
  const response = await requestUtils.getRequest(apiContext, endPoints.PET_BY_PET_ID, {
    ownerId: expectedData.ownerId,
    petId: expectedData.pet.id,
  });

  // Step 2: Validate the response status code
  responseBody = await responseUtils.validateResponse(response, 200);

  // Step 3: Validate the response body content
  await responseUtils.validatePetResponseBody(
    responseBody,
    expectedData.ownerName, // Fetching owner name from JSON
    parseInt(expectedData.pet.id), // Fetching pet id from JSON
    expectedData.pet.name, // Fetching pet name from JSON
    expectedData.pet.birthDate, // Fetching pet birthDate from JSON
    parseInt(expectedData.pet.typeId), // Fetching type id from JSON
    expectedData.pet.typeName // Fetching type name from JSON
  );

  // Step 4: Validate the response body schema against pet schema
  await responseUtils.validateResponseBodySchema(responseBody, petSchema);
});

// Test for getting a different pet by Pet ID for the same owner
test("Get a different pet by Pet ID for the same owner @bug", async ({
  apiContext,
  requestUtils,
  responseUtils,
  petSchema,
  endPoints,
}) => {
  const expectedData = petData.getPetSuccess2; // Get data for this test from JSON

  // Step 1: Make GET request for a pet by owner ID
  const response = await requestUtils.getRequest(apiContext, endPoints.PET_BY_PET_ID, {
    ownerId: expectedData.ownerId,
    petId: expectedData.pet.id,
  });

  // Step 2: Validate the response status code
  responseBody = await responseUtils.validateResponse(response, 200);

  // Step 3: Validate the response body content
  await responseUtils.validatePetResponseBody(
    responseBody,
    expectedData.ownerName, // Fetching owner name from JSON
    parseInt(expectedData.pet.id), // Fetching pet id from JSON
    expectedData.pet.name, // Fetching pet name from JSON
    expectedData.pet.birthDate, // Fetching pet birthDate from JSON
    parseInt(expectedData.pet.typeId), // Fetching type id from JSON
    expectedData.pet.typeName // Fetching type name from JSON
  );

  // Step 4: Validate the response body schema against pet schema
  await responseUtils.validateResponseBodySchema(responseBody, petSchema);
});

// Test for getting a pet with NOT FOUND Owner ID
test("Get a pet with NOT FOUND Owner ID @bug", async ({
  apiContext,
  requestUtils,
  responseUtils,
  errorSchema,
  endPoints,
}) => {
  const { ownerId, petId } = petData.petOwnerNotFound; // Use data from JSON

  // Step 1: Make GET request for a pet by non-existent owner ID
  const response = await requestUtils.getRequest(apiContext, endPoints.PET_BY_PET_ID, {
    ownerId,
    petId,
  });

  // Step 2: Validate the NOT FOUND response
  responseBody = await responseUtils.validateNotFoundResponse(response, 404);

  // Step 3: Validate the response schema
  await responseUtils.validateResponseBodySchema(responseBody, errorSchema);
});

// Test for getting a pet with NOT FOUND Pet ID
test("Get a pet with NOT FOUND Pet ID @bug", async ({
  apiContext,
  requestUtils,
  responseUtils,
  errorSchema,
  endPoints,
}) => {
  const { ownerId, petId } = petData.petNotFound; // Use data from JSON

  // Step 1: Make GET request for a pet by non-existent pet ID
  const response = await requestUtils.getRequest(apiContext, endPoints.PET_BY_PET_ID, {
    ownerId,
    petId,
  });

  // Step 2: Validate the NOT FOUND response
  responseBody = await responseUtils.validateNotFoundResponse(response, 404);

  // Step 3: Validate the response schema
  await responseUtils.validateResponseBodySchema(responseBody, errorSchema);
});

// Test for getting a pet with Invalid Owner ID
test("Get a pet by Invalid Owner ID - BAD REQUEST @bug", async ({
  apiContext,
  requestUtils,
  responseUtils,
  errorSchema,
  endPoints,
}) => {
  const { ownerId, petId } = petData.invalidOwnerID; // Use data from JSON

  // Step 1: Make GET request for a pet by invalid owner ID
  const response = await requestUtils.getRequest(apiContext, endPoints.PET_BY_PET_ID, {
    ownerId,
    petId,
  });

  // Step 2: Validate the BAD REQUEST response
  responseBody = await responseUtils.validateBadRequestResponse(response, 400);

  // Step 3: Validate the response schema
  await responseUtils.validateResponseBodySchema(responseBody, errorSchema);
});

// Test for getting a pet with Invalid Pet ID
test("Get a pet by Invalid Pet ID - BAD REQUEST", async ({
  apiContext,
  requestUtils,
  responseUtils,
  errorSchema,
  endPoints,
}) => {
  const { ownerId, petId } = petData.invalidPetID; // Use data from JSON

  // Step 1: Make GET request for a pet by invalid pet ID
  const response = await requestUtils.getRequest(apiContext, endPoints.PET_BY_PET_ID, {
    ownerId,
    petId,
  });

  // Step 2: Validate the BAD REQUEST response
  responseBody = await responseUtils.validateBadRequestResponse(response, 400);

  // Step 3: Validate the response schema
  await responseUtils.validateResponseBodySchema(responseBody, errorSchema);
});

// Test for getting a pet with Empty Owner ID
test("Get a pet by Empty Owner ID - NOT FOUND", async ({
  apiContext,
  requestUtils,
  responseUtils,
  errorSchema,
  endPoints,
}) => {
  const { ownerId, petId } = petData.emptyOwnerID; // Use data from JSON

  // Step 1: Make GET request for a pet by empty owner ID
  const response = await requestUtils.getRequest(apiContext, endPoints.PET_BY_PET_ID, {
    ownerId,
    petId,
  });

  // Step 2: Validate the NOT FOUND response
  responseBody = await responseUtils.validateNotFoundResponse(response, 404);

  // Step 3: Validate the response schema
  await responseUtils.validateResponseBodySchema(responseBody, errorSchema);
});
