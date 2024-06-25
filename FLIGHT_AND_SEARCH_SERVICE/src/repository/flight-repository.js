const { Flights } = require("../models/index");
const { Op } = require("sequelize");
class FlightRepository {
  #createFilter(data) {
    let filter = {};
    if (data.arrivalAirportId) {
      filter.arrivalAirportId = data.arrivalAirportId;
    }
    if (data.departureAirportId) {
      filter.departureAirportId = data.departureAirportId;
    }
    if (data.minPrice && data.maxPrice)
      Object.assign(filter, {
        [Op.and]: [
          { price: { [Op.gte]: data.minPrice } },
          { price: { [Op.lte]: data.maxPrice } },
        ],
      });
    else if (data.minPrice) {
      Object.assign(filter, { price: { [Op.gte]: data.minPrice } });
    } else if (data.maxPrice) {
      Object.assign(filter, { price: { [Op.lte]: data.maxPrice } });
    }
    return filter;
  }
  async createFlight(data) {
    try {
      const flight = await Flights.create(data);
      return flight;
    } catch (error) {
      console.log("Something Went Wrong in Flight Repository");
      throw { error };
    }
  }

  async getFlight(flightId) {
    try {
      const flight = await Flights.findByPk(flightId);
      return flight;
    } catch (error) {
      console.log("Something Went Wrong in Flight Repository");

      throw { error };
    }
  }
  async getAllFlight(filters) {
    try {
      const filterObject = this.#createFilter(filters);
      const flight = await Flights.findAll({
        where: filterObject,
      });
      return flight;
    } catch (error) {
      console.log("Something Went Wrong in Flight Repository");

      throw { error };
    }
  }
  async updateFlight(flightId, data) {
    try {
      await Flights.update(data, {
        where: {
          id: flightId,
        },
      });
      return true;
    } catch (error) {
      console.log("Something Went Wrong in Flight Repository");
      throw error;
    }
  }
}
module.exports = FlightRepository;
