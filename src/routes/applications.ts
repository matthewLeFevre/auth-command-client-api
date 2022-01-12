import { Router } from "express";
import createApp from "../controllers/applications/create";
import getAllByUserId from "../controllers/applications/getAllByUserId";

const ApplicationRouter = Router();

ApplicationRouter.post("/", createApp);
ApplicationRouter.get("/user", getAllByUserId);

export default ApplicationRouter;
