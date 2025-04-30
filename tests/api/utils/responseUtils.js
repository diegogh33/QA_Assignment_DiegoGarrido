import { APIResponse, expect } from "@playwright/test";
import { validateResponseSchema } from "./schemaValidator"; // Importar la función

class ResponseUtils {
  /**
   * Logs the entire response for debugging purposes.
   * @param response - The API response object to be logged.
   */
  async logResponse(response) {
    console.log(`Response status: ${response.status()}`);
    console.log(`Response body: ${await response.text()}`);
  }

  /**
   * Validates the response for a successful request by checking status code and content type.
   * Logs the response and returns the JSON-parsed body for further validation.
   * @param response - The API response object to validate.
   * @param expectedStatusCode - The expected HTTP status code.
   * @returns The JSON-parsed response body.
   */
  async validateResponse(response, expectedStatusCode) {
    this.logResponse(response);
    expect(response.status()).toBe(expectedStatusCode);

    // Check if the content-type contains 'application/json'
    const contentType = await response.headers()["content-type"];
    if (!contentType || !contentType.includes("application/json")) {
      console.error("Empty response body Error"); // Log the message if content-type is not 'application/json'
    }

    expect(contentType).toContain("application/json"); // Continue with the assertion

    return await response.json(); // Simplified return of parsed JSON
  }

  /**
   * Validates that the response is a Bad Request (400) and logs the error message.
   * @param response - The API response object.
   * @param expectedStatusCode - The expected HTTP status code (400 for bad request).
   * @returns The JSON-parsed response body.
   */
  async validateBadRequestResponse(response, expectedStatusCode) {
    const responseBody = await this.validateResponse(response, 400);
    expect(responseBody.error).toContain("Bad Request");
    console.error(`Bad Request: ${responseBody.message}`);
    return responseBody; // Return the parsed response body
  }

  /**
   * Validates that the response is a Not Found (404) and logs the error message.
   * @param response - The API response object.
   * @param expectedStatusCode - The expected HTTP status code (404 for not found).
   * @returns The JSON-parsed response body.
   */
  async validateNotFoundResponse(response, expectedStatusCode) {
    const responseBody = await this.validateResponse(response, 404);
    expect(responseBody.error).toContain("Not Found");
    console.error(`Not Found: ${responseBody.message}`);
    return responseBody; // Return the parsed response body
  }

  /**
   * Validates that the response is Internal Server Error(500) and logs the error message.
   * @param response - The API response object.
   * @param expectedStatusCode - The expected HTTP status code (500 for Internal Server Error).
   * @returns The JSON-parsed response body.
   */
  async validateInternalServerErrorResponse(response, expectedStatusCode) {
    const responseBody = await this.validateResponse(response, 500);
    expect(responseBody.error).toContain("Server Error");
    console.error(`Server Error: ${responseBody.message}`);
    return responseBody; // Return the parsed response body
  }

  /**
   * Validates that the response is Internal Server Error(500) and logs the error message.
   * @param response - The API response object.
   * @param expectedStatusCode - The expected HTTP status code (500 for Internal Server Error).
   * @returns The JSON-parsed response body.
   */
  async validateMethodNotAllowedResponse(response, expectedStatusCode) {
    const responseBody = await this.validateResponse(response, 405);
    expect(responseBody.error).toContain("Method Not Allowed");
    console.error(`Method Not Allowed: ${responseBody.message}`);
    return responseBody; // Return the parsed response body
  }

  /**
   * Generic function to validate any error response by status code.
   * Logs the error message and returns the parsed response body.
   * @param response - The API response object.
   * @param expectedStatusCode - The expected HTTP status code for the error.
   * @returns The JSON-parsed response body.
   */
  async validateErrorResponse(response, expectedStatusCode) {
    const responseBody = await this.validateResponse(response, expectedStatusCode);
    console.error(`Error Response: ${responseBody.message}`);
    return responseBody; // Return the parsed response body
  }

  /**
   * Validates that the response body contains the expected owner details.
   * @param responseBody - The parsed response body.
   * @param firstName - The expected first name of the owner.
   * @param lastName - The expected last name of the owner.
   * @param address - The expected address of the owner.
   * @param city - The expected city of the owner.
   * @param telephone - The expected telephone number of the owner.
   */
  async validateOwnerResponseBody(
    responseBody,
    firstName,
    lastName,
    address,
    city,
    telephone
  ) {
    expect(responseBody.firstName).toBe(firstName);
    expect(responseBody.lastName).toBe(lastName);
    expect(responseBody.address).toBe(address);
    expect(responseBody.city).toBe(city);
    expect(responseBody.telephone).toBe(telephone);
  }

  /**
   * Validates that the response body contains the expected pet details.
   * @param responseBody - The parsed response body.
   * @param ownerName - The expected name of the pet's owner.
   * @param petId - The expected pet ID.
   * @param petName - The expected name of the pet.
   * @param birthDate - The expected birth date of the pet.
   * @param typeID - The expected type ID of the pet (e.g., cat or dog).
   * @param typeName - The expected type name of the pet (e.g., cat).
   */
  async validatePetResponseBody(
    responseBody,
    ownerName,
    petId,
    petName,
    birthDate,
    typeID,
    typeName
  ) {
    expect(responseBody.owner).toBe(ownerName);
    expect(responseBody.name).toBe(petName);
    expect(responseBody.id).toEqual(petId);
    expect(responseBody.birthDate).toBe(birthDate);
    expect(responseBody.type.id).toEqual(typeID);
    expect(responseBody.type.name).toBe(typeName);
  }

  /**
   * Validates that the response body contains a validation error for a missing field.
   * @param responseBody - The parsed response body containing errors.
   * @param field - The name of the missing field.
   */
  async validateMissingFieldError(responseBody, field) {
    const errors = responseBody.errors;
    const fieldError = errors.find((error) => error.field === field);
    expect(fieldError).toBeDefined(); // Assert that the error for the field exists
    expect(fieldError.defaultMessage).toBe("must not be empty"); // Assert the specific error message
  }

  /**
   * Validates the response body against the expected schema.
   * @param responseBody - The parsed response body.
   * @param expectedSchema - The schema to validate the response body against.
   */
  async validateResponseBodySchema(responseBody, expectedSchema) {
    const isValid = validateResponseSchema(responseBody, expectedSchema);
    expect(isValid).toBeTruthy();
  }
}

export default ResponseUtils;
