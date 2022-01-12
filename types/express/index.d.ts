import AuthCommandSDK from "@auth-command/auth-command-sdk";
import { Collection } from "@everlast-brands/collection";
import { SecureJwt } from "@everlast-brands/secure-jwt";
import { Account } from "../../src/utilities/Model";

declare global {
  namespace Express {
    interface Request {
      auth: AuthCommandSDK;
      jwt: SecureJwt;
      account: Account;
      collections: {
        accounts: Collection;
      };
    }
  }
}
