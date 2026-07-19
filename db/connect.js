const { MongoClient } = require("mongodb");
const dns = require("node:dns/promises");

let database;

const initDb = async (callback) => {
  if (database) {
    console.log("Database is already initialized.");
    return callback(null, database);
  }

  try {
    dns.setServers(["1.1.1.1"]);

    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();

    database = client.db("gamesAPI");

    console.log("Connected to MongoDB.");
    callback(null, database);
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    callback(error);
  }
};

const getDb = () => {
  if (!database) {
    throw new Error("Database has not been initialized.");
  }

  return database;
};

module.exports = {
  initDb,
  getDb
};