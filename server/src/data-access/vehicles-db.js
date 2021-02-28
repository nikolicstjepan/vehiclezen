const Id = require("../Id");

module.exports = function makeVehiclesDb({ makeDb }) {
  return Object.freeze({
    findAll,
    findById,
    findByHash,
    findByMake,
    findByModel,
    findByYear,
    insert,
    remove,
  });

  async function findAll({ limit = 30, skip = 0 } = {}) {
    const db = await makeDb();
    const result = await db.collection("vehicles").find().skip(skip).limit(limit);
    const found = await result.toArray();
    return found.map(({ _id: id, ...found }) => ({
      id,
      ...found,
    }));
  }

  async function findById({ id: _id }) {
    const db = await makeDb();
    const result = await db.collection("vehicles").find({ _id });
    const found = await result.toArray();
    if (found.length === 0) {
      return null;
    }
    const { _id: id, ...info } = found[0];
    return { id, ...info };
  }

  async function findByHash({ hash }) {
    const db = await makeDb();
    const result = await db.collection("vehicles").find({ hash });
    const found = await result.toArray();
    if (found.length === 0) {
      return null;
    }
    const { _id: id, ...info } = found[0];
    return { id, ...info };
  }

  async function findByMake({ make, limit = 30, skip = 0 } = {}) {
    const db = await makeDb();
    const result = await db.collection("vehicles").find({ make }).skip(skip).limit(limit);
    const found = await result.toArray();
    return found.map(({ _id: id, ...found }) => ({
      id,
      ...found,
    }));
  }

  async function findByModel({ model, limit = 30, skip = 0 } = {}) {
    const db = await makeDb();
    const result = await db.collection("vehicles").find({ model }).skip(skip).limit(limit);
    const found = await result.toArray();
    return found.map(({ _id: id, ...found }) => ({
      id,
      ...found,
    }));
  }

  async function findByYear({ year, limit = 30, skip = 0 } = {}) {
    const db = await makeDb();
    const result = await db.collection("vehicles").find({ year }).skip(skip).limit(limit);
    const found = await result.toArray();
    return found.map(({ _id: id, ...found }) => ({
      id,
      ...found,
    }));
  }

  async function insert({ id: _id = Id.makeId(), ...info }) {
    const db = await makeDb();
    const result = await db.collection("vehicles").insertOne({ _id, ...info });
    const { _id: id, ...insertedInfo } = result.ops[0];
    return { id, ...insertedInfo };
  }

  async function remove({ id: _id }) {
    const db = await makeDb();
    const result = await db.collection("vehicles").deleteOne({ _id });
    return result.deletedCount > 0;
  }
};
