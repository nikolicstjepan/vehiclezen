const makeUser = require("./");
const makeFakeUser = require("../../__test__/fixtures/user");

describe("user entity", () => {
  it("can have id", () => {
    expect.assertions(2);
    const user = makeFakeUser({ id: "null" });

    try {
      makeUser(user);
    } catch (error) {
      expect(error.message).toBe("User must have an valid id");
    }

    const noId = makeFakeUser({ id: undefined });
    const generatedIdUser = makeUser(noId);
    expect(generatedIdUser.getId()).toBeDefined();
  });

  it("can create id", async () => {
    const noId = makeFakeUser({ id: undefined });
    const user = makeUser(noId);
    expect(user.getId()).toBeDefined();
  });

  it("must have a username", () => {
    expect.assertions(1);
    const user = makeFakeUser({ username: null });

    try {
      makeUser(user);
    } catch (error) {
      expect(error.message).toBe("User must have a username");
    }
  });

  it("username must be string", () => {
    expect.assertions(1);
    const user = makeFakeUser({ username: true });

    try {
      makeUser(user);
    } catch (error) {
      expect(error.message).toBe("Username must be a string");
    }
  });

  it("must have a password", () => {
    expect.assertions(1);
    const user = makeFakeUser({ password: null });

    try {
      makeUser(user);
    } catch (error) {
      expect(error.message).toBe("User must have password");
    }
  });

  it("password must be string", () => {
    expect.assertions(1);
    const user = makeFakeUser({ password: 12345 });

    try {
      makeUser(user);
    } catch (error) {
      expect(error.message).toBe("Password must be a string");
    }
  });

  it("password must have at least 6 char", () => {
    expect.assertions(1);
    const user = makeFakeUser({ password: "12345" });

    try {
      makeUser(user);
    } catch (error) {
      expect(error.message).toBe("Password must have more than 5 char");
    }
  });
});
