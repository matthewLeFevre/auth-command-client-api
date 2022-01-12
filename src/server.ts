import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import AuthCommandSDK from "@auth-command/auth-command-sdk";
import * as admin from "firebase-admin";
import { Collection } from "@everlast-brands/collection";
import AccountRouter from "./routes/accounts";
import ApplicationRouter from "./routes/applications";
import { SecureJwt } from "@everlast-brands/secure-jwt";

export default function createServer() {
  dotenv.config();

  admin.initializeApp();

  const DB = admin.firestore();
  DB.settings({ ignoreUndefinedProperties: true });

  const collections = {
    accounts: new Collection("accounts", DB),
    applications: new Collection("applications", DB),
  };

  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use((req, res, next) => {
    req.auth = new AuthCommandSDK({
      path: <string>process.env.AUTH_APP_DOMAIN,
      appAPIKey: <string>process.env.APP_API_KEY,
      appID: <string>process.env.APP_ID,
    });
    req.collections = collections;
    req.jwt = new SecureJwt(process.env.JWT_SECRET, 60 * 15);
    next();
  });

  // App routes
  app.use("/accounts", AccountRouter);
  app.use("/applications", ApplicationRouter);

  return app;
}
