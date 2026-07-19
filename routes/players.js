const express = require("express");
const router = express.Router();

const playersController = require("../controllers/players");

const {
  playerValidationRules,
  validate
} = require("../middleware/validate");

console.log("playersController =", playersController);
console.log("playerValidationRules =", typeof playerValidationRules);
console.log("validate =", typeof validate);

router.get("/", playersController.getAll);
router.get("/:id", playersController.getSingle);

// TEMPORARILY disable validation
router.post("/", playersController.createPlayer);

router.put("/:id", playersController.updatePlayer);

router.delete("/:id", playersController.deletePlayer);

module.exports = router;