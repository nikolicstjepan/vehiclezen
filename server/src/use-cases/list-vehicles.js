module.exports = function buildListVehicles({ vehiclesDb }) {
  return async function makeListVehicles(query = {}) {
    const { make, model, year, page } = query;
    const { findByMake, findByModel, findByYear, findAll } = vehiclesDb;

    const limit = 10;
    const skip = (page - 1) * limit;

    if (make) {
      const makeRegex = new RegExp(escapeRegex(make), "gi");

      return findByMake({ make: makeRegex, limit, skip });
    }

    if (model) {
      const modelRegex = new RegExp(escapeRegex(model), "gi");

      return findByModel({ model: modelRegex, limit, skip });
    }

    if (year) {
      return findByYear({ year, limit, skip });
    }

    return findAll({ limit, skip });
  };
};

// https://stackoverflow.com/questions/3115150/how-to-escape-regular-expression-special-characters-using-javascript
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
