import { Request } from "express";

const verification = [];
const validation = [];
function login(req: Request, res) {
  const { email, password } = req.body();
  const result = await req.auth.login();
}
