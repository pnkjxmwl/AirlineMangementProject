const express = require("express");
const CityController = require("../../controllers/city-controller");
const AirportController = require("../../controllers/airport-controller");
const AirplaneController = require("../../controllers/airplane-controller");
const FlightController = require("../../controllers/flight-controller");
const FlightMiddlewares = require("../../middelwares/flight-middleware");
const router = express.Router();

//City Routes
router.post("/city", CityController.create);
router.delete("/city/:id", CityController.destroy);
router.get("/city/:id", CityController.get);
router.get("/city", CityController.getAll);
router.patch("/city/:id", CityController.update);

//airport routes
router.post("/airports", AirportController.create);

//airport routes
router.post("/airplane", AirplaneController.create);

//Flight routes
router.post(
  "/flights",
  FlightMiddlewares.validateCreateFlight,
  FlightController.create
);
router.get("/flights", FlightController.getAll);
router.get("/flights/:id", FlightController.get);
router.patch("/flights/:id", FlightController.update);

module.exports = router;
