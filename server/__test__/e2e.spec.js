const axios = require("axios");
const crypto = require("crypto");

const { makeDb, usersDb, vehiclesDb } = require("../src/data-access");
const makeFakeUser = require("./fixtures/user");
const makeFakeVehicle = require("./fixtures/vehicle");

describe("vehiclezen API", () => {
  let token;

  beforeAll(() => {
    axios.defaults.baseURL = `${process.env.BASE_URL}:${process.env.PORT}${process.env.API_ROOT}`;
    axios.defaults.headers.common["Content-Type"] = "application/json";
    axios.defaults.validateStatus = (status) => {
      return status < 500;
    };
  });

  afterAll(async () => {
    const db = await makeDb();
    db.collection("users").drop();
    db.collection("vehicles").drop();
  });

  describe("user API", () => {
    it("registers user", async () => {
      const user = makeFakeUser();
      const response = await axios.post("/users", user);

      const userDoc = await usersDb.findByUsername(user);

      const { posted } = response.data;

      expect(response.status).toBe(201);
      expect(posted).toEqual(userDoc);
    });

    it("logins user / gets token", async () => {
      const password = "password";
      const { username } = await usersDb.insert(makeFakeUser({ password: md5(password) }));

      const response = await axios.post("/users/login", { username, password });

      expect(response.status).toBe(200);
      expect(response.data.token).toBeDefined();

      // for future use
      token = response.data.token;
    });
  });

  describe("vehicles API", () => {
    beforeAll(() => {
      axios.defaults.headers.common["token"] = token;
    });

    it("rejects unauthorized users", async () => {
      const response = await axios.get("/vehicles", {
        headers: {
          token: "invalid",
        },
      });

      expect(response.status).toBe(403);
    });

    it("add vehicle", async () => {
      const vehicle = makeFakeVehicle();
      const response = await axios.post("/vehicles", vehicle);

      const vehicleDoc = await vehiclesDb.findByHash(vehicle);

      const { posted } = response.data;

      expect(response.status).toBe(201);
      expect(posted).toEqual(vehicleDoc);
    });

    it("remove vehicle", async () => {
      const vehicle = await vehiclesDb.insert(makeFakeVehicle());

      const response = await axios.delete(`/vehicles/${vehicle.id}`);

      const { removed } = response.data;
      const vehicleDoc = await vehiclesDb.findById(vehicle);

      expect(response.status).toBe(200);
      expect(removed).toBe(true);
      expect(vehicleDoc).toBe(null);
    });

    it("list vehicles", async () => {
      const inserts = await Promise.all(
        [makeFakeVehicle(), makeFakeVehicle(), makeFakeVehicle()].map(vehiclesDb.insert)
      );

      const response = await axios.get("/vehicles");

      const { list } = response.data;

      expect.assertions(inserts.length + 1);
      expect(response.status).toBe(200);
      inserts.forEach((insert) => expect(list).toContainEqual(insert));
    });

    it("list vehicles by make", async () => {
      const make = "fakeMake99";
      const searchMake = "keMake9";
      const inserts = await Promise.all(
        [makeFakeVehicle({ make }), makeFakeVehicle({ make }), makeFakeVehicle({ make })].map(
          vehiclesDb.insert
        )
      );

      // adding more that shouldn't show in list
      await Promise.all([makeFakeVehicle(), makeFakeVehicle()].map(vehiclesDb.insert));

      const response = await axios.get(`/vehicles?make=${searchMake}`);

      const { list } = response.data;

      expect(response.status).toBe(200);
      expect(list.length).toBe(inserts.length);
      inserts.forEach((insert) => expect(list).toContainEqual(insert));
    });

    it("list vehicles by model", async () => {
      const model = "fakeModel99";
      const searchModel = "keModel9";
      const inserts = await Promise.all(
        [makeFakeVehicle({ model }), makeFakeVehicle({ model }), makeFakeVehicle({ model })].map(
          vehiclesDb.insert
        )
      );

      // adding more that shouldn't show in list
      await Promise.all([makeFakeVehicle(), makeFakeVehicle()].map(vehiclesDb.insert));

      const response = await axios.get(`/vehicles?model=${searchModel}`);

      const { list } = response.data;

      expect(response.status).toBe(200);
      expect(list.length).toBe(inserts.length);
      inserts.forEach((insert) => expect(list).toContainEqual(insert));
    });

    it("list vehicles by year", async () => {
      const year = 1791;
      const inserts = await Promise.all(
        [makeFakeVehicle({ year }), makeFakeVehicle({ year }), makeFakeVehicle({ year })].map(
          vehiclesDb.insert
        )
      );

      // adding more that shouldn't show in list
      await Promise.all([makeFakeVehicle(), makeFakeVehicle()].map(vehiclesDb.insert));

      const response = await axios.get(`/vehicles?year=${year}`);

      const { list } = response.data;

      expect(response.status).toBe(200);
      expect(list.length).toBe(inserts.length);
      inserts.forEach((insert) => expect(list).toContainEqual(insert));
    });
  });
});

function md5(text) {
  return crypto.createHash("md5").update(text, "utf-8").digest("hex");
}
