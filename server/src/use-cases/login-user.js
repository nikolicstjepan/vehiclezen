module.exports = function buildMakeLoginUser({ usersDb, Hash, Jwt }) {
  return async function makeLoginUser(userInfo) {
    const { password, username } = userInfo;

    if (!password) {
      throw new Error("password missing");
    }

    if (!username) {
      throw new Error("username missing");
    }

    const foundUser = await usersDb.findByUsername({ username });
    if (!foundUser) {
      throw new Error("User doesn't exist");
    }

    if (foundUser.password !== Hash.makeHash(password)) {
      throw new Error("Password invalid");
    }

    return Jwt.sign({ id: foundUser.id });
  };
};
