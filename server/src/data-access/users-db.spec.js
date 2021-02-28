const makeDb = require("../../__test__/fixtures/db");
const makeUsersDb = require("./users-db");
const makeFakeUser = require("../../__test__/fixtures/user");

describe("users db", () => {
  let usersDb;

  beforeEach(() => {
    usersDb = makeUsersDb({ makeDb });
  });

  it("inserts a user", async () => {
    const user = makeFakeUser();
    const result = await usersDb.insert(user);
    return expect(result).toEqual(user);
  });

  it("finds user by it's username", async () => {
    const userOne = makeFakeUser();
    const userTwo = makeFakeUser();

    await usersDb.insert(userOne);
    await usersDb.insert(userTwo);

    expect(await usersDb.findByUsername(userOne)).toEqual(userOne);
    expect(await usersDb.findByUsername(userTwo)).toEqual(userTwo);
  });

  it("finds user by it's id", async () => {
    const userOne = makeFakeUser();
    const userTwo = makeFakeUser();

    await usersDb.insert(userOne);
    await usersDb.insert(userTwo);

    expect(await usersDb.findById(userOne)).toEqual(userOne);
    expect(await usersDb.findById(userTwo)).toEqual(userTwo);
  });
});
