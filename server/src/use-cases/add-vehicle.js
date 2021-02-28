const makeVehicle = require("../vehicle");

module.exports = function buildMakeAddVehicle({ vehiclesDb }) {
  return async function makeAddVehicle(vehicleInfo) {
    const vehicle = makeVehicle(vehicleInfo);

    const exists = await vehiclesDb.findByHash({ hash: vehicle.getHash() });
    if (exists) {
      throw new Error("Vehicle already exists");
    }

    return vehiclesDb.insert({
      id: vehicle.getId(),
      make: vehicle.getMake(),
      model: vehicle.getModel(),
      year: vehicle.getYear(),
      hash: vehicle.getHash(),
    });
  };
};
