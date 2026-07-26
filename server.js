require("dotenv").config();

const express = require("express");
const session = require("express-session");
const { MongoStore } = require("connect-mongo"); // <-- FIXED
const passport = require("passport");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");

const mongodb = require("./db/connect");
const configurePassport = require("./config/passport");

const app = express();
const port = process.env.PORT || 3000;

// Register Google authentication strategy
configurePassport(passport);

// Middleware
app.use(express.json());

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24
    }
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/", require("./routes"));

// Connect to MongoDB and start server
mongodb.initDb((error) => {
  if (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }

  console.log("Connected to MongoDB");

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});