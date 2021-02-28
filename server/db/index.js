require("dotenv").config();

const makeVehicle = require("../src/vehicle");
const { makeDb } = require("../src/data-access");
const allData = require("./VehicleInfo.json");

const toInsert = allData
  .filter((v) => v.make && v.model && v.year)
  .map((v) => {
    const vehicle = makeVehicle(v);

    return {
      id: vehicle.getId(),
      make: vehicle.getMake(),
      model: vehicle.getModel(),
      year: vehicle.getYear(),
      hash: vehicle.getHash(),
    };
  });

(async function setupDb() {
  console.log("Setting up database...");
  const db = await makeDb();

  const collections = (await db.listCollections().toArray()).map((collection) => collection.name);

  for (let i = 0; i < collections.length; i++) {
    await db.dropCollection(collections[i]);
  }

  const userIndexes = await db
    .collection("users")
    .createIndexes([{ key: { username: 1 }, name: "username_idx" }]);

  const vehicleIndexes = await db.collection("vehicles").createIndexes([
    { key: { make: 1 }, name: "make_idx" },
    { key: { model: 1 }, name: "model_idx" },
    { key: { year: 1 }, name: "year_idx" },
  ]);

  console.log({ userIndexes, vehicleIndexes });

  console.log(`Inserting ${toInsert.length} vehicle data in db...`);
  await db.collection("vehicles").insertMany(toInsert);

  console.log("Database setup complete...");
  process.exit();
})();
