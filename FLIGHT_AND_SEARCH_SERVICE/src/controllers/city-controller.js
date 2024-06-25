const { response } = require("express");
const { CityService } = require("../services/index.js");

const cityservice = new CityService();

//POST
const create = async (req, resp) => {
  try {
    const city = await cityservice.createCity(req.body);
    return resp.status(201).json({
      data: city,
      success: true,
      message: "Succesfull in creating a city",
      err: {},
    });
  } catch (error) {
    console.log("Something went wrong in City controller");
    return resp.status(500).json({
      data: {},
      success: false,
      message: "UnSuccesfull in creating a city",
      err: error,
    });
  }
};

//DELETE   /city/:id
const destroy = async (req, resp) => {
  try {
    const reponse = await cityservice.deleteCity(req.params.id);
    return resp.status(200).json({
      data: response,
      success: true,
      message: "Succesfull in Deleting a city",
      err: {},
    });
  } catch (error) {
    console.log("Something went wrong in City controller");
    return resp.status(500).json({
      data: {},
      success: false,
      message: "UnSuccesfull in deleting a city",
      err: error,
    });
  }
};

//GET    /city/:id
const get = async (req, resp) => {
  try {
    const city = await cityservice.getCity(req.params.id);
    return resp.status(500).json({
      data: city,
      success: true,
      message: "Succesfull in Getting a city",
      err: {},
    });
  } catch (error) {
    console.log("Something went wrong in City controller");
    return resp.status(500).json({
      data: {},
      success: false,
      message: "UnSuccesfull in Getting a city",
      err: error,
    });
  }
};

//PATCH - /city/:id ->req.body(data in req body)
const update = async (req, resp) => {
  try {
    const city = await cityservice.updateCity(req.params.id, req.body);
    return resp.status(200).json({
      data: city,
      success: true,
      message: "Succesfully updated a city",
      err: {},
    });
  } catch (error) {
    console.log("Something went wrong in City controller");
    return resp.status(500).json({
      data: {},
      success: false,
      message: "Not able to update city",
      err: error,
    });
  }
};

const getAll = async (req, resp) => {
  try {
    const cities = await cityservice.getallCities(req.query);
    return resp.status(200).json({
      data: cities,
      success: true,
      message: "Succesfully fetched all cities",
      err: {},
    });
  } catch (error) {
    console.log(error);
    return resp.status(500).json({
      data: {},
      success: false,
      message: "Not able to get all cities",
      err: error,
    });
  }
};
module.exports = {
  create,
  destroy,
  get,
  update,
  getAll,
};
