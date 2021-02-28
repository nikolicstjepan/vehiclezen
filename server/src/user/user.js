module.exports = function buildMakeUser({ Id, Hash }) {
  return function makeUser({ id = Id.makeId(), username, password }) {
    if (!Id.isValidId(id)) {
      throw new Error("User must have an valid id");
    }

    if (!username) {
      throw new Error("User must have a username");
    }

    if (typeof username !== "string") {
      throw new Error("Username must be a string");
    }

    if (!password) {
      throw new Error("User must have password");
    }

    if (typeof password !== "string") {
      throw new Error("Password must be a string");
    }

    if (password.length < 6) {
      throw new Error("Password must have more than 5 char");
    }

    let passwordHash;

    return Object.freeze({
      getId: () => id,
      getUsername: () => username,
      getPassword: () => passwordHash || (passwordHash = Hash.makeHash(password)),
    });
  };
};
