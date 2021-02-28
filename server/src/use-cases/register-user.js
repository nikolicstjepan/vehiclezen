const makeUser = require("../user");

module.exports = function buildMakeRegisterUser({ usersDb }) {
  return async function makeRegisterUser(usersInfo) {
    const user = makeUser(usersInfo);

    const exists = await usersDb.findByUsername({ username: user.getUsername() });
    if (exists) {
      throw new Error("User already exists");
    }

    return usersDb.insert({
      id: user.getId(),
      username: user.getUsername(),
      password: user.getPassword(),
    });
  };
};
