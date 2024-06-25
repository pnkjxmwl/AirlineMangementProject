const { FlightService } = require("../services/index");
const flightservice = new FlightService();

const create = async (req, resp) => {
  try {
    const flightRequestData = {
      flightNumber: req.body.flightNumber,
      airplaneId: req.body.airplaneId,
      departureAirportId: req.body.departureAirportId,
      arrivalAirportId: req.body.arrivalAirportId,
      arrivalTime: req.body.arrivalTime,
      departureTime: req.body.departureTime,
      price: req.body.price,
    };
    const flight = await flightservice.CreateFlight(flightRequestData);

    return resp.status(201).json({
      data: flight,
      success: true,
      err: {},
      message: "Succesfully created a flight",
    });
  } catch (error) {
    console.log("Something went wront in Flight Controller");
    return resp.status(500).json({
      data: {},
      success: false,
      message: "Not able to create a flight",
      err: error,
    });
  }
};

const getAll = async (req, resp) => {
  try {
    console.log(req.query);
    const flights = await flightservice.getAllflights(req.query);
    return resp.status(200).json({
      data: flights,
      success: true,
      message: "Succesfully fetched all flights",
      err: {},
    });
  } catch (error) {
    console.log("Something went wront in Flight Controller");
    return resp.status(500).json({
      data: {},
      success: false,
      message: "Not able to get all flight",
      err: error,
    });
  }
};
const get = async (req, resp) => {
  try {
    const response = await flightservice.getFlight(req.params.id);
    return resp.status(200).json({
      data: response,
      success: true,
      message: "Succesfully fetched the flights",
      err: {},
    });
  } catch (error) {
    console.log("Something went wront in Flight Controller");
    return resp.status(500).json({
      data: {},
      success: false,
      message: "Not able to get the flight",
      err: error,
    });
  }
};
const update = async (req, resp) => {
  try {
    const response = await flightservice.updateFlight(req.params.id, req.body);
    return resp.status(200).json({
      data: response,
      success: true,
      message: "Succesfully Updated the flight",
      err: {},
    });
  } catch (error) {
    console.log("Something went wront in Flight Controller");
    return resp.status(500).json({
      data: {},
      success: false,
      message: "Not able to Update the flight",
      err: error,
    });
  }
};
module.exports = {
  create,
  getAll,
  get,
  update,
};
