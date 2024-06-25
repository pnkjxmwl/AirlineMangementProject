const { Op } = require("sequelize");
const { City } = require("../models/index.js");

class CityRepository {
  async createCity({ cityname }) {
    try {
      const city = await City.create({
        name: cityname,
      });
      return city;
    } catch (error) {
      console.log("Something went wrong in City Repository");
      throw { error };
    }
  }

  async deleteCity(cityid) {
    try {
      console.log(cityid);
      await City.destroy({
        where: {
          id: cityid,
        },
      });
      return true;
    } catch (error) {
      console.log("Something went wrong in City Repository");
      throw { error };
    }
  }
  async getCity(cityid) {
    try {
      const city = await City.findByPk(cityid);
      return city;
    } catch (error) {
      console.log("Something went wrong in City Repository");
      throw { error };
    }
  }

  async updateCity(cityid, data) {
    try {
      const city = await City.findByPk(cityid);
      city.name = data.name;
      await city.save();
      return city;
    } catch (error) {
      console.log("Something went wrong in City Repository");
      throw { error };
    }
  }

  async getallCities(filter) {
    try {
      if (filter.name) {
        const cities = await City.findAll({
          where: {
            name: {
              [Op.startsWith]: filter.name,
            },
          },
        });
        return cities;
      }
      //if there is no filter returning all cities
      const cities = await City.findAll();
      return cities;
    } catch (error) {
      console.log("Something went wrong in City Repository");
      throw { error };
    }
  }
}
module.exports = CityRepository;
