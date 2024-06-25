const CrudService = require("./crud-service.js");

const { AirportRepository } = require("../repository/index.js");

class AirportService extends CrudService {
  constructor() {
    const airportRepoObj = new AirportRepository();
    super(airportRepoObj);
  }
}
module.exports = AirportService;
