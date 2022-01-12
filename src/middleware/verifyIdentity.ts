import { Request } from "express";
import { InvalidBearerTokenError } from "../utilities/errors";
import extractToken from "../utilities/extractToken";

export default async function verifyIdentity(req: Request, res, next) {
  const token = extractToken(req.headers);
  await req.jwt.verify(token);
  const { id } = await req.jwt.getPayload(token);
  const account = await req.collections.accounts.getById(id);
  if (account.token !== token) throw InvalidBearerTokenError;
  req.account = account;
  next();
}
