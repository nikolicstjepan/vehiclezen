module.exports = function buildMakeFindUser({ usersDb }) {
  return async function makeFindUser({ id } = {}) {
    if (!id) {
      throw new Error("id missing");
    }

    return usersDb.findById({ id });
  };
};
