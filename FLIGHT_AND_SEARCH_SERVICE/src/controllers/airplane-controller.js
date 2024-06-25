const { AirplaneService } = require("../services");
const airplaneserviceobj = new AirplaneService();

const create = async (req, resp) => {
  try {
    const airplane = await airplaneserviceobj.createAirplane(req.body);
    return resp.status(201).json({
      data: airplane,
      success: true,
      err: {},
      message: "Succesfully created a new Airplane",
    });
  } catch (error) {
    console.log("something went wrong in airplane controller");
    return resp.status(500).json({
      data: {},
      success: false,
      err: error,
      message: "UnSuccesfull in creating a new Airplane",
    });
  }
};

module.exports = {
  create,
};
