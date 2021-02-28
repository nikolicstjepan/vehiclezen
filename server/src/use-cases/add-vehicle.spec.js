const makeAddVehicle = require("./add-vehicle");
const makeFakeVehicle = require("../../__test__/fixtures/vehicle");

describe("add vehicle", () => {
  const vehiclesDb = {
    insert: (data) => data,
    findByHash: () => false,
  };

  it("adds vehicle", async () => {
    const fakeVehicle = makeFakeVehicle();

    const insert = jest.fn((data) => data);

    const addVehicle = makeAddVehicle({ vehiclesDb: { ...vehiclesDb, insert } });

    const vehicle = await addVehicle(fakeVehicle);

    expect(insert).toHaveBeenCalledWith(vehicle);
  });

  it("doesn't add duplicated vehicle", async () => {
    const fakeVehicle = makeFakeVehicle();

    const findByHash = jest.fn(() => true);

    const addVehicle = makeAddVehicle({ vehiclesDb: { ...vehiclesDb, findByHash } });

    try {
      await addVehicle(fakeVehicle);
    } catch (error) {
      expect(error.message).toBe("Vehicle already exists");
    }

    expect(findByHash).toHaveBeenCalledWith({ hash: fakeVehicle.hash });
  });
});
