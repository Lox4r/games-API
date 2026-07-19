const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Games API",
    description: "API for managing games and players"
  },
  host: "games-api-oy2k.onrender.com",
  schemes: ["https"]
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./server.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);