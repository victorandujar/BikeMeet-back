import { CustomError } from "./CustomError";

describe("Given a CustomError class", () => {
  describe("When it is instanced with the message 'Endpoint not found', the status code 404 and the public message 'Endpoint not found'", () => {
    const expectedError = {
      message: "Endpoint not found",
      statusCode: 404,
      publicMessage: "Endpoint not found",
    };

    const customError = new CustomError(
      expectedError.message,
      expectedError.statusCode,
      expectedError.publicMessage
    );
    test("Then it should show the property message", () => {
      expect(customError).toHaveProperty("message", expectedError.message);
    });

    test("Then it should show the property status code", () => {
      expect(customError).toHaveProperty(
        "statusCode",
        expectedError.statusCode
      );
    });

    test("Then it should show the property public message", () => {
      expect(customError).toHaveProperty(
        "publicMessage",
        expectedError.publicMessage
      );
    });
  });
});
