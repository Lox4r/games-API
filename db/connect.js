const dns = require("node:dns/promises");
const { MongoClient } = require("mongodb");

let database;

const initDb = async (callback) => {
  if (database) {
    return callback(null, database);
  }

  try {
    // Use public DNS servers to avoid SRV lookup issues on Windows
    dns.setServers(["1.1.1.1", "8.8.8.8"]);

    const client = new MongoClient(process.env.MONGODB_URI);

    await client.connect();

    database = client.db("gamesAPI");

    console.log("Connected to MongoDB");

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
  getDb,
};