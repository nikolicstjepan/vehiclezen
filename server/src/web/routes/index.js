const express = require("express");

const userRoutes = require("./user-routes");
const vehicleRoutes = require("./vehicle-routes");

const tokenChecker = require("../auth/token-checker");

const router = express.Router();
const apiRoot = process.env.API_ROOT;

router.use(`${apiRoot}/users`, userRoutes);
router.use(`${apiRoot}/vehicles`, tokenChecker, vehicleRoutes);

module.exports = router;
