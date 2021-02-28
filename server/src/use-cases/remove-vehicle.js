module.exports = function buildMakeRemoveVehicle({ vehiclesDb }) {
  return async function makeRemoveVehicle({ id }) {
    return vehiclesDb.remove({ id });
  };
};
