const { AirportService } = require("../services/index.js");

const airportServiceObj = new AirportService();

const create = async (req, resp) => {
  try {
    const response = await airportServiceObj.create(req.body);
    return resp.status(201).json({
      data: response,
      success: true,
      err: {},
      message: "Succesfully created a new airport",
    });
  } catch (error) {
    console.log(error);
    return resp.status(500).json({
      data: {},
      success: false,
      err: error,
      message: "Cannot create a new airport",
    });
  }
};
module.exports = {
  create,
};
