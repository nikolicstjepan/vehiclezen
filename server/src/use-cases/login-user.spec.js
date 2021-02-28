const makeLoginUser = require("./login-user");
const makeFakeUser = require("../../__test__/fixtures/user");
const Jwt = require("../Jwt");
const Hash = require("../Hash");

describe("login user", () => {
  it("returns jwt token containing users id", async () => {
    const fakeUser = makeFakeUser({ password: Hash.makeHash("vehiclezen") });

    const usersDb = {
      findByUsername: () => fakeUser,
    };

    const loginUser = makeLoginUser({ usersDb, Hash, Jwt });

    const token = await loginUser({ username: fakeUser.username, password: "vehiclezen" });

    expect(Jwt.verify(token).id).toBe(fakeUser.id);
  });

  it("requires password", async () => {
    expect.assertions(1);
    const fakeUser = makeFakeUser();

    const loginUser = makeLoginUser({});

    try {
      await loginUser({ username: fakeUser.username });
    } catch (error) {
      expect(error.message).toBe("password missing");
    }
  });

  it("requires username", async () => {
    expect.assertions(1);
    const fakeUser = makeFakeUser();

    const loginUser = makeLoginUser({});

    try {
      await loginUser({ password: fakeUser.password });
    } catch (error) {
      expect(error.message).toBe("username missing");
    }
  });

  it("requires user to exist", async () => {
    expect.assertions(2);
    const fakeUser = makeFakeUser();

    const usersDb = {
      findByUsername: jest.fn(() => null),
    };

    const loginUser = makeLoginUser({ usersDb });

    try {
      await loginUser(fakeUser);
    } catch (error) {
      expect(error.message).toBe("User doesn't exist");
    }

    expect(usersDb.findByUsername).toHaveBeenCalledWith({ username: fakeUser.username });
  });

  it("requires password to match", async () => {
    expect.assertions(1);
    const fakeUser = makeFakeUser();

    const usersDb = {
      findByUsername: () => fakeUser,
    };

    const loginUser = makeLoginUser({ usersDb, Hash });

    try {
      await loginUser(fakeUser);
    } catch (error) {
      expect(error.message).toBe("Password invalid");
    }
  });
});
