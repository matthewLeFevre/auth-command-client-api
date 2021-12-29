import express from "express";
import dotenv from "dotenv";
import ExampleRouter from "./routes/example";
import cors from "cors";
import AuthCommandSDK from "@auth-command/auth-command-sdk";

export default function createServer() {
  dotenv.config();

  const app = express();
  app.use(cors());

  // Performs the same task that body parser does
  app.use(express.json());

  app.use((req, res, next) => {
    req.auth = new AuthCommandSDK({
      path: "http://localhost:3334",
      appAPIKey: "",
      appID: "",
    });
    next();
  });

  // App routes
  app.use("/example", ExampleRouter);

  return app;
}
