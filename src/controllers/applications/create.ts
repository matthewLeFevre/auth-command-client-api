import { asyncWrapper, send } from "@everlast-brands/error-handling";
import { Request } from "express";
import { body } from "express-validator";
import validationCheck from "../../middleware/validationCheck";
import verifyIdentity from "../../middleware/verifyIdentity";
import { createNewApp } from "./utilities/helperMethods";

const verification = [asyncWrapper(verifyIdentity)];
const validation = [
  body("email").exists(),
  body("name").exists(),
  body("description").optional(),
  body("website").optional(),
  validationCheck,
];
async function create(req: Request, res) {
  const appId = await createNewApp(req.body);
  // save app id to account
  console.log("Got here");
  const result = await req.collections.accounts.updateById(req.account.id, {
    ...req.account,
    appIds: [...req.account.appIds, appId],
  });
  send({ res, data: result });
}

const createApp = [...verification, ...validation, asyncWrapper(create)];
export default createApp;
