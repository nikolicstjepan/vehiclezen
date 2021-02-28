const Id = require("../Id");

module.exports = function makeUsersDb({ makeDb }) {
  return Object.freeze({
    findByUsername,
    findById,
    insert,
  });

  async function findById({ id: _id }) {
    const db = await makeDb();
    const result = await db.collection("users").find({ _id });
    const found = await result.toArray();
    if (found.length === 0) {
      return null;
    }
    const { _id: id, ...info } = found[0];
    return { id, ...info };
  }

  async function findByUsername({ username }) {
    const db = await makeDb();
    const result = await db.collection("users").find({ username });
    const found = await result.toArray();
    if (found.length === 0) {
      return null;
    }
    const { _id: id, ...info } = found[0];
    return { id, ...info };
  }

  async function insert({ id: _id = Id.makeId(), ...info }) {
    const db = await makeDb();
    const result = await db.collection("users").insertOne({ _id, ...info });
    const { _id: id, ...insertedInfo } = result.ops[0];
    return { id, ...insertedInfo };
  }
};
