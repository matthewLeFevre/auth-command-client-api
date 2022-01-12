import { asyncWrapper, send } from "@everlast-brands/error-handling";
import { Request } from "express";
import verifyIdentity from "../../middleware/verifyIdentity";

async function refresh(req: Request, res) {
  const account = await req.collections.accounts.getById(req.account.id);
  const user = await req.auth.getUserById(req.account.id);
  send({ res, data: { ...account, ...user.data.data } });
}

const refreshUser = [asyncWrapper(verifyIdentity), asyncWrapper(refresh)];

export default refreshUser;
