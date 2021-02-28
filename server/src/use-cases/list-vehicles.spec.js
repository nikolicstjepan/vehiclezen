const makeListVehicles = require("./list-vehicles");

describe("list vehicles", () => {
  it("list all vehicles", async () => {
    const findAll = jest.fn((data) => data);

    const listVehicles = makeListVehicles({ vehiclesDb: { findAll } });

    await listVehicles();

    expect(findAll).toHaveBeenCalled();
  });

  it("list vehicles by model", async () => {
    const model = "TRANSIT";
    const findByModel = jest.fn((data) => data);

    const listVehicles = makeListVehicles({ vehiclesDb: { findByModel } });

    await listVehicles({ model, page: 2 });

    expect(findByModel).toHaveBeenCalledWith({
      model: new RegExp(escapeRegex(model), "gi"),
      limit: 10,
      skip: 10,
    });
  });

  it("list vehicles by make", async () => {
    const make = "FORD";
    const findByMake = jest.fn((data) => data);

    const listVehicles = makeListVehicles({ vehiclesDb: { findByMake } });

    await listVehicles({ make, page: 1 });

    expect(findByMake).toHaveBeenCalledWith({
      make: new RegExp(escapeRegex(make), "gi"),
      limit: 10,
      skip: 0,
    });
  });

  it("list vehicles by year", async () => {
    year = 2020;
    const findByYear = jest.fn((data) => data);

    const listVehicles = makeListVehicles({ vehiclesDb: { findByYear } });

    await listVehicles({ year: 2020, page: 1 });

    expect(findByYear).toHaveBeenCalledWith({ year, limit: 10, skip: 0 });
  });
});

// https://stackoverflow.com/questions/3115150/how-to-escape-regular-expression-special-characters-using-javascript
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
