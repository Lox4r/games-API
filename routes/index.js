const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");
const gamesRoutes = require("./games");
const playersRoutes = require("./players");

router.get("/", (req, res) => {
  res.json({ message: "API running" });
});

router.use("/auth", authRoutes);
router.use("/games", gamesRoutes);
router.use("/players", playersRoutes);

module.exports = router;