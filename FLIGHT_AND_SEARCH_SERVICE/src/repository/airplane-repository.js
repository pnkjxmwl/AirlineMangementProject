const { Airplane } = require("../models/index");

class AirplaneRepository {
  async createAirplane({ capacity, modelnumber }) {
    try {
      const airplane = await Airplane.create({
        modelNumber: modelnumber,
        capacity: capacity,
      });
      return airplane;
    } catch (error) {
      console.log("Something went wront in Airplane repository");
      throw { error };
    }
  }

  async getAirplane(id) {
    try {
      const airplane = await Airplane.findByPk(id);
      return airplane;
    } catch (error) {
      console.log("Something went wront in Airplane repository");
      throw { error };
    }
  }
}
module.exports = AirplaneRepository;
