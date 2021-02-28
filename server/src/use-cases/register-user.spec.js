const makeRegisterUser = require("./register-user");
const makeFakeUser = require("../../__test__/fixtures/user");

describe("register user", () => {
  const usersDb = {
    insert: (data) => data,
    findByUsername: () => false,
  };

  it("adds user to db", async () => {
    const fakeUser = makeFakeUser();

    const insert = jest.fn((data) => data);

    const registerUser = makeRegisterUser({ usersDb: { ...usersDb, insert } });

    const user = await registerUser(fakeUser);

    expect(insert).toHaveBeenCalledWith(user);
  });

  it("doesn't add duplicated user", async () => {
    const fakeUser = makeFakeUser();

    const findByUsername = jest.fn(() => true);

    const registerUser = makeRegisterUser({ usersDb: { ...usersDb, findByUsername } });

    try {
      await registerUser(fakeUser);
    } catch (error) {
      expect(error.message).toBe("User already exists");
    }

    expect(findByUsername).toHaveBeenCalledWith({ username: fakeUser.username });
  });
});
