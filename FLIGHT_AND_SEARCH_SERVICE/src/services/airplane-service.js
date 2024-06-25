const { AirplaneRepository } = require("../repository");

class AirplaneService {
  constructor() {
    this.airplanerepo = new AirplaneRepository();
  }

  async createAirplane(data) {
    try {
      const airplane = await this.airplanerepo.createAirplane(data);
      return airplane;
    } catch (error) {
      console.log("Something went wrong in Airplane Service");
      throw error;
    }
  }
}
module.exports = AirplaneService;
