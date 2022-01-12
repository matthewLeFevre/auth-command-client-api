import { Router } from "express";
import createUser from "../controllers/accounts/create";
import loginUser from "../controllers/accounts/login";
import refreshUser from "../controllers/accounts/refreshUser";

const AccountRouter = Router();

AccountRouter.post("/", createUser);
AccountRouter.post("/login", loginUser);
AccountRouter.get("/refresh", refreshUser);

export default AccountRouter;
