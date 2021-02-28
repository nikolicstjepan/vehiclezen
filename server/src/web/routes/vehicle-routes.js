const express = require("express");

const vehicleController = require("../controllers/vehicle-controller");

const router = express.Router();

router.post("/", vehicleController.add);
router.get("/", vehicleController.list);
router.delete("/:id", vehicleController.remove);

module.exports = router;
