import { CustomError } from "@everlast-brands/error-handling";

export const InvalidBearerTokenError = new CustomError(
  "AuthenticationError",
  "Invalid bearer token",
  400
);
