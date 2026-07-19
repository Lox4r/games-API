const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Games API",
    description: "API for managing games and players"
  },
  host: "games-api-abat.onrender.com",
  schemes: ["http"]
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./server.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);