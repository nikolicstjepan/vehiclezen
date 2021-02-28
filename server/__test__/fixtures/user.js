const faker = require("faker");
const cuid = require("cuid");

const Id = Object.freeze({
  makeId: cuid,
  isValidId: cuid.isCuid,
});

module.exports = function makeFakeVehicle(overrides) {
  const user = {
    id: Id.makeId(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
    ...overrides,
  };

  return user;
};
