const makeRemoveVehicle = require("./remove-vehicle");
const makeFakeVehicle = require("../../__test__/fixtures/vehicle");

describe("remove vehicle", () => {
  it("handles remove of vehicle", async () => {
    const fakeVehicle = makeFakeVehicle();

    const remove = jest.fn(({ id }) => id);

    const removeVehicle = makeRemoveVehicle({ vehiclesDb: { remove } });

    await removeVehicle(fakeVehicle);

    expect(remove).toHaveBeenCalledWith({ id: fakeVehicle.id });
  });
});
