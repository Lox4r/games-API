const express = require("express");
const router = express.Router();

// Controllers
const playersController = require("../controllers/players");

// Middleware modules
const authModule = require("../middleware/auth");
const validateModule = require("../middleware/validate");

const { isAuthenticated } = authModule;
const { playerValidationRules, validate } = validateModule;

// Public routes
router.get("/", playersController.getAll);
router.get("/:id", playersController.getSingle);

// Protected routes
router.post(
  "/",
  isAuthenticated,
  playerValidationRules,
  validate,
  playersController.createPlayer
);

router.put(
  "/:id",
  isAuthenticated,
  playerValidationRules,
  validate,
  playersController.updatePlayer
);

router.delete(
  "/:id",
  isAuthenticated,
  playersController.deletePlayer
);

module.exports = router;