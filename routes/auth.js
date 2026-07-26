const express = require("express");
const passport = require("passport");

const router = express.Router();

// Start Google OAuth login
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

// Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/failure"
  }),
  (req, res) => {
    res.redirect("/auth/status");
  }
);

// Login status
router.get("/status", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      authenticated: false,
      message: "Not logged in"
    });
  }

  res.status(200).json({
    authenticated: true,
    user: req.user
  });
});

// Logout
router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }

    req.session.destroy(() => {
      res.clearCookie("connect.sid");

      res.status(200).json({
        message: "Logged out successfully."
      });
    });
  });
});

// Failed authentication
router.get("/failure", (req, res) => {
  res.status(401).json({
    authenticated: false,
    message: "Google authentication failed."
  });
});

module.exports = router;