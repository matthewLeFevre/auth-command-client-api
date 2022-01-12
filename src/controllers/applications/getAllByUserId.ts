import { asyncWrapper, send } from "@everlast-brands/error-handling";
import verifyIdentity from "../../middleware/verifyIdentity";

const verification = [asyncWrapper(verifyIdentity)];

async function getAllById(req, res) {
  const result = await Promise.all(
    req.account.appIds.map(id => req.collections.applications.getById(id))
  );
  send({ res, data: result });
}

const getAllByUserId = [...verification, asyncWrapper(getAllById)];

export default getAllByUserId;
