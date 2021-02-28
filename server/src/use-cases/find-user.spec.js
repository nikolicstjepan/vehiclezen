const makeFindUser = require("./find-user");
const makeFakeUser = require("../../__test__/fixtures/user");

describe("find user", () => {
  it("finds user by id", async () => {
    const fakeUser = makeFakeUser();

    const findById = jest.fn((data) => data);

    const findUser = makeFindUser({ usersDb: { findById } });

    await findUser(fakeUser);

    expect(findById).toHaveBeenCalledWith({ id: fakeUser.id });
  });

  it("requires id", async () => {
    expect.assertions(1);
    const fakeUser = makeFakeUser();

    const findUser = makeFindUser({});

    try {
      await findUser();
    } catch (error) {
      expect(error.message).toBe("id missing");
    }
  });
});
