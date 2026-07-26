const { body, validationResult } = require("express-validator");

// =========================
// Game Validation Rules
// =========================
const gameValidationRules = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required"),

  body("genre")
    .trim()
    .notEmpty()
    .withMessage("Genre is required"),

  body("platform")
    .trim()
    .notEmpty()
    .withMessage("Platform is required"),

  body("developer")
    .trim()
    .notEmpty()
    .withMessage("Developer is required"),

  body("publisher")
    .trim()
    .notEmpty()
    .withMessage("Publisher is required"),

  body("releaseYear")
    .isInt({ min: 1950, max: 2100 })
    .withMessage("Release year must be between 1950 and 2100"),

  body("rating")
    .isFloat({ min: 0, max: 10 })
    .withMessage("Rating must be between 0 and 10"),

  body("completed")
    .isBoolean()
    .withMessage("Completed must be true or false"),

  body("hoursPlayed")
    .isFloat({ min: 0 })
    .withMessage("Hours played must be 0 or greater")
];

// =========================
// Player Validation Rules
// =========================
const playerValidationRules = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required"),

  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required"),

  body("favoriteGame")
    .trim()
    .notEmpty()
    .withMessage("Favorite game is required"),

  body("country")
    .trim()
    .notEmpty()
    .withMessage("Country is required"),

  body("platform")
    .trim()
    .notEmpty()
    .withMessage("Platform is required"),

  body("age")
    .isInt({ min: 13, max: 120 })
    .withMessage("Age must be between 13 and 120"),

  body("hoursPlayed")
    .isFloat({ min: 0 })
    .withMessage("Hours played must be 0 or greater"),

  body("online")
    .isBoolean()
    .withMessage("Online must be true or false")
];

// =========================
// Validation Middleware
// =========================
const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  next();
};

module.exports = {
  gameValidationRules,
  playerValidationRules,
  validate
};