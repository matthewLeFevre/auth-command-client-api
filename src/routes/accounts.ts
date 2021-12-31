import { Router } from "express";
import createUser from "../controllers/accounts/create";

const AccountRouter = Router();

AccountRouter.post("/", createUser);

export default AccountRouter;
