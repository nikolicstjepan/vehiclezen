const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let connection, db;

module.exports = async function makeDb() {
  connection =
    connection ||
    (await MongoClient.connect(global.__MONGO_URI__, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }));
  db = db || (await connection.db(global.__MONGO_DB_NAME__));
  return db;
};
