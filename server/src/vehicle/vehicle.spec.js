const makeVehicle = require("./");
const makeFakeVehicle = require("../../__test__/fixtures/vehicle");

describe("vehicle entity", () => {
  it("can have id", () => {
    expect.assertions(2);
    const vehicle = makeFakeVehicle({ id: "null" });

    try {
      makeVehicle(vehicle);
    } catch (error) {
      expect(error.message).toBe("Vehicle must have an valid id");
    }

    const noId = makeFakeVehicle({ id: undefined });
    const generatedIdVehicle = makeVehicle(noId);
    expect(generatedIdVehicle.getId()).toBeDefined();
  });

  it("can create id", async () => {
    const noId = makeFakeVehicle({ id: undefined });
    const vehicle = makeVehicle(noId);
    expect(vehicle.getId()).toBeDefined();
  });

  it("must have a make", () => {
    expect.assertions(1);
    const vehicle = makeFakeVehicle({ make: null });

    try {
      makeVehicle(vehicle);
    } catch (error) {
      expect(error.message).toBe("Vehicle must have make");
    }
  });

  it("make must be string", () => {
    expect.assertions(1);
    const vehicle = makeFakeVehicle({ make: true });

    try {
      makeVehicle(vehicle);
    } catch (error) {
      expect(error.message).toBe("Make must be a string");
    }
  });

  it("must have a model", () => {
    expect.assertions(1);
    const vehicle = makeFakeVehicle({ model: null });

    try {
      makeVehicle(vehicle);
    } catch (error) {
      expect(error.message).toBe("Vehicle must have model");
    }
  });

  it("model must be string", () => {
    expect.assertions(1);
    const vehicle = makeFakeVehicle({ model: true });

    try {
      makeVehicle(vehicle);
    } catch (error) {
      expect(error.message).toBe("Model must be a string");
    }
  });

  it("must have a year", () => {
    expect.assertions(1);
    const vehicle = makeFakeVehicle({ year: null });

    try {
      makeVehicle(vehicle);
    } catch (error) {
      expect(error.message).toBe("Vehicle must have year");
    }
  });

  it("year must be number", () => {
    expect.assertions(1);
    const vehicle = makeFakeVehicle({ year: true });

    try {
      makeVehicle(vehicle);
    } catch (error) {
      expect(error.message).toBe("Year must be a number");
    }
  });

  it("creates hash", () => {
    const fakeVehicle = makeFakeVehicle({ make: "BMW", model: "5", year: 2019 });

    const vehicle = makeVehicle(fakeVehicle);
    // hash generated with http://onlinemd5.com/
    expect(vehicle.getHash()).toBe("45cc7de6967d127f39cb8cba654f8f9d");
  });
});
