const mongodb = require("mongodb");

const makeUsersDb = require("./users-db");
const makeVehiclesDb = require("./vehicles-db");

const MongoClient = mongodb.MongoClient;
const url = process.env.DB_URL;
const dbName = process.env.DB_NAME;
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function makeDb() {
  if (!client.isConnected()) {
    await client.connect();
  }
  return client.db(dbName);
}

const usersDb = makeUsersDb({ makeDb });
const vehiclesDb = makeVehiclesDb({ makeDb });

module.exports = {
  makeDb,
  usersDb,
  vehiclesDb,
};
