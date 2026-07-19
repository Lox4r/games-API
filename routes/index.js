const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the Games API",
    endpoints: {
      games: "/games",
      players: "/players",
      documentation: "/api-docs"
    }
  });
});

router.use("/games", require("./games"));
router.use("/players", require("./players"));

module.exports = router;