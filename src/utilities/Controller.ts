import { Collection } from "@everlast-brands/collection";
import { send } from "@everlast-brands/error-handling";
import Model from "./Model";

export default class Controller {
  collection: Collection;
  model: Model;
  constructor(collection: Collection, model: Model) {
    this.collection = collection;
    this.model = model;
  }
  async create(req, res) {
    const result = await this.collection.create(req.body);
    send({ res, data: result });
  }
  async readById(req, res) {
    const result = await this.collection.getById(req.params.id);
    send({ res, data: result });
  }
  async readAll(req, res) {
    const result = await this.collection.getAll();
    send({ res, data: result });
  }
  async update(req, res) {
    const result = await this.collection.updateById(req.params.id, req.body);
    send({ res, data: result });
  }
  async delete(req, res) {
    await this.collection.deleteById(req.params.id);
    send({ res });
  }
}
