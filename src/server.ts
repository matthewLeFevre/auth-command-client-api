import express from "express";
import dotenv from "dotenv";
import ExampleRouter from "./routes/example";
import cors from "cors";
import AuthCommandSDK from "@auth-command/auth-command-sdk";
import * as admin from "firebase-admin";
import { Collection } from "@everlast-brands/collection";
import AccountRouter from "./routes/accounts";

export default function createServer() {
  dotenv.config();

  admin.initializeApp();

  const DB = admin.firestore();
  DB.settings({ ignoreUndefinedProperties: true });

  const collections = {
    accounts: new Collection("accounts", DB),
  };

  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use((req, res, next) => {
    req.auth = new AuthCommandSDK({
      path: "http://localhost:3334",
      appAPIKey: <string>process.env.APP_API_KEY,
      appID: <string>process.env.APP_ID,
    });
    req.collections = collections;
    next();
  });

  // App routes
  app.use("/accounts", AccountRouter);

  return app;
}
