const express = require("express");
const router = express.Router();

const gamesController = require("../controllers/games");
const { isAuthenticated } = require("../middleware/auth");
const {
  gameValidationRules,
  validate
} = require("../middleware/validate");

// Public routes
router.get("/", gamesController.getAll);
router.get("/:id", gamesController.getSingle);

// Protected routes
router.post(
  "/",
  isAuthenticated,
  gameValidationRules,
  validate,
  gamesController.createGame
);

router.put(
  "/:id",
  isAuthenticated,
  gameValidationRules,
  validate,
  gamesController.updateGame
);

router.delete(
  "/:id",
  isAuthenticated,
  gamesController.deleteGame
);

module.exports = router;