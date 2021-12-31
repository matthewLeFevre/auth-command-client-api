import { asyncWrapper, send } from "@everlast-brands/error-handling";
import { Request } from "express";
import { body } from "express-validator";
import validationCheck from "../../middleware/validationCheck";

const verification = [];
const validation = [
  body("email").exists(),
  body("password").exists(),
  body("name").exists(),
  body("line1").exists(),
  body("line2").optional(),
  body("city").exists(),
  body("state").exists(),
  body("zip").exists(),
  validationCheck,
];
async function create(req: Request, res) {
  const { email, password, name, line1, line2, city, state, zip } = req.body;

  // create auth command user
  const id: any = await req.auth.createUser({ email, password, name });

  // create auth command account
  const account: any = await req.collections.accounts.createWithId(
    {
      name,
      address: {
        line1,
        line2,
        city,
        state,
        zip,
      },
    },
    id
  );

  send({ res, data: account });
}

const createUser = [...verification, ...validation, asyncWrapper(create)];

export default createUser;
