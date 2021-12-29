import AuthCommandSDK from "@auth-command/auth-command-sdk";
import { Collection } from "@everlast-brands/collection";

declare global {
  namespace Express {
    interface Request {
      auth: AuthCommandSDK;
      collections: {
        "user-accounts": Collection;
      };
    }
  }
}
