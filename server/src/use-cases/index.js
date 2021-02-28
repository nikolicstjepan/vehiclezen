const makeFindUser = require("./find-user");
const makeRegisterUser = require("./register-user");
const makeLoginUser = require("./login-user");

const makeAddVehicle = require("./add-vehicle");
const makeListVehicles = require("./list-vehicles");
const makeRemoveVehicle = require("./remove-vehicle");

const { usersDb, vehiclesDb } = require("../data-access");
const Hash = require("../Hash");
const Jwt = require("../Jwt");

const findUser = makeFindUser({ usersDb });
const registerUser = makeRegisterUser({ usersDb });
const loginUser = makeLoginUser({ usersDb, Jwt, Hash });

const addVehicle = makeAddVehicle({ vehiclesDb });
const listVehicles = makeListVehicles({ vehiclesDb });
const removeVehicle = makeRemoveVehicle({ vehiclesDb });

module.exports = {
  findUser,
  registerUser,
  loginUser,
  addVehicle,
  listVehicles,
  removeVehicle,
};
