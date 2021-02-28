const faker = require("faker");
const cuid = require("cuid");
const crypto = require("crypto");

const Id = Object.freeze({
  makeId: cuid,
  isValidId: cuid.isCuid,
});

function md5(text) {
  return crypto.createHash("md5").update(text, "utf-8").digest("hex");
}

module.exports = function makeFakeVehicle(overrides) {
  const vehicle = {
    id: Id.makeId(),
    make: faker.vehicle.manufacturer(),
    model: faker.vehicle.model(),
    year: faker.random.number({ min: 2000, max: 2021 }),
    ...overrides,
  };

  vehicle.hash = md5(vehicle.make + vehicle.model + String(vehicle.year));

  return vehicle;
};
