import { asyncWrapper, send } from "@everlast-brands/error-handling";
import { Request } from "express";
import { body } from "express-validator";
import validationCheck from "../../middleware/validationCheck";

const verification = [];
const validation = [
  body("email").exists(),
  body("password").exists(),
  validationCheck,
];
async function login(req: Request, res) {
  const { email, password } = req.body;
  const user = await req.auth.authenticate(email, password);
  const account = await req.collections.accounts.getById(user.id);
  const token = await req.jwt.sign(
    {
      id: user.id,
    },
    60 * 15
  );
  await req.collections.accounts.updateById(user.id, { ...account, token });
  send({ res, data: { ...user, ...account, token } });
}

const loginUser = [...verification, ...validation, asyncWrapper(login)];
export default loginUser;
