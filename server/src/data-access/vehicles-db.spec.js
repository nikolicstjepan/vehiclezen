const makeDb = require("../../__test__/fixtures/db");
const makeVehiclesDb = require("./vehicles-db");
const makeFakeVehicle = require("../../__test__/fixtures/vehicle");

describe("vehicles db", () => {
  let vehiclesDb;

  beforeEach(() => {
    vehiclesDb = makeVehiclesDb({ makeDb });
  });

  it("lists vehicles", async () => {
    const inserts = await Promise.all(
      [makeFakeVehicle(), makeFakeVehicle(), makeFakeVehicle()].map(vehiclesDb.insert)
    );

    const foundList = await vehiclesDb.findAll({ limit: 100 });

    expect.assertions(inserts.length);
    inserts.forEach((insert) => expect(foundList).toContainEqual(insert));
  });

  it("limits the list of vehicles", async () => {
    await Promise.all(
      [makeFakeVehicle(), makeFakeVehicle(), makeFakeVehicle()].map(vehiclesDb.insert)
    );

    const foundList = await vehiclesDb.findAll({ limit: 1 });

    expect(foundList.length).toBe(1);
  });

  it("finds vehicle by it's id", async () => {
    const vehicleOne = makeFakeVehicle();
    const vehicleTwo = makeFakeVehicle();

    await vehiclesDb.insert(vehicleOne);
    await vehiclesDb.insert(vehicleTwo);

    expect(await vehiclesDb.findById(vehicleOne)).toEqual(vehicleOne);
    expect(await vehiclesDb.findById(vehicleTwo)).toEqual(vehicleTwo);
  });

  it("inserts a vehicle", async () => {
    const vehicle = makeFakeVehicle();
    const result = await vehiclesDb.insert(vehicle);

    expect(result).toEqual(vehicle);
  });

  it("finds vehicle by it's hash", async () => {
    const vehicleOne = makeFakeVehicle();
    const vehicleTwo = makeFakeVehicle();

    await vehiclesDb.insert(vehicleOne);
    await vehiclesDb.insert(vehicleTwo);

    expect(await vehiclesDb.findByHash(vehicleOne)).toEqual(vehicleOne);
    expect(await vehiclesDb.findByHash(vehicleTwo)).toEqual(vehicleTwo);
  });

  it("lists vehicles with specific make", async () => {
    const make = "BMW";
    const inserts = await Promise.all(
      [makeFakeVehicle({ make }), makeFakeVehicle({ make }), makeFakeVehicle({ make })].map(
        vehiclesDb.insert
      )
    );

    const foundList = await vehiclesDb.findByMake({ make });

    expect.assertions(inserts.length);
    inserts.forEach((insert) => expect(foundList).toContainEqual(insert));
  });

  it("lists vehicles with specific model", async () => {
    const model = "316";
    const inserts = await Promise.all(
      [makeFakeVehicle({ model }), makeFakeVehicle({ model }), makeFakeVehicle({ model })].map(
        vehiclesDb.insert
      )
    );

    const foundList = await vehiclesDb.findByModel({ model });

    expect.assertions(inserts.length);
    inserts.forEach((insert) => expect(foundList).toContainEqual(insert));
  });

  it("lists vehicles with specific year", async () => {
    const year = 2016;
    const inserts = await Promise.all(
      [makeFakeVehicle({ year }), makeFakeVehicle({ year }), makeFakeVehicle({ year })].map(
        vehiclesDb.insert
      )
    );

    const foundList = await vehiclesDb.findByYear({ year });

    expect.assertions(inserts.length);
    inserts.forEach((insert) => expect(foundList).toContainEqual(insert));
  });

  it("removes vehicle by id", async () => {
    const one = makeFakeVehicle();
    const two = makeFakeVehicle();

    await vehiclesDb.insert(one);
    await vehiclesDb.insert(two);

    expect(await vehiclesDb.remove(one)).toBe(true);
    expect(await vehiclesDb.remove(two)).toBe(true);
  });
});
