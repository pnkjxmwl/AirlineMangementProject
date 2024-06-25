const { CityRepository } = require("../repository/index.js");

class CityService {
  constructor() {
    this.cityRepository = new CityRepository();
  }

  async createCity(data) {
    try {
      const city = await this.cityRepository.createCity(data);
      return city;
    } catch (error) {
      console.log("Something went wront in City Service");
      throw { error };
    }
  }

  async deleteCity(cityid) {
    try {
      const resp = await this.cityRepository.deleteCity(cityid);
      return resp;
    } catch (error) {
      console.log("Something went wront in City Service");
      throw { error };
    }
  }
  async updateCity(cityid, data) {
    try {
      const city = await this.cityRepository.updateCity(cityid, data);
      return city;
    } catch (error) {
      console.log("Something went wront in City Service");
      throw { error };
    }
  }
  async getCity(Cityid) {
    try {
      const city = await this.cityRepository.getCity(cityid);
      return city;
    } catch (error) {
      console.log("Something went wront in City Service");
      throw { error };
    }
  }
  async getallCities(filter) {
    try {
      const cities = await this.cityRepository.getallCities({
        name: filter.name,
      });
      return cities;
    } catch (error) {
      console.log("Something went wront in City Service");
      throw { error };
    }
  }
}

module.exports = CityService;
