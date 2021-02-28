module.exports = function buildMakeVehicle({ Id, Hash }) {
  return function makeUser({ id = Id.makeId(), make, model, year }) {
    if (!Id.isValidId(id)) {
      throw new Error("Vehicle must have an valid id");
    }

    if (!make) {
      throw new Error("Vehicle must have make");
    }

    if (typeof make !== "string") {
      throw new Error("Make must be a string");
    }

    if (!model) {
      throw new Error("Vehicle must have model");
    }

    if (typeof model !== "string") {
      throw new Error("Model must be a string");
    }

    if (!year) {
      throw new Error("Vehicle must have year");
    }

    if (typeof year !== "number") {
      throw new Error("Year must be a number");
    }

    function makeHash() {
      return Hash.makeHash(make + model + String(year));
    }

    let hash;

    return Object.freeze({
      getId: () => id,
      getMake: () => make,
      getModel: () => model,
      getYear: () => year,
      getHash: () => hash || (hash = makeHash()),
    });
  };
};
