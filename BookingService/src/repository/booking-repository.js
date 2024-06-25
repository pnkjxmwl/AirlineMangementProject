const { Booking } = require("../models/index");
const { StatusCodes } = require("http-status-codes");

class BookingRepository {
  async create(data) {
    try {
      const booking = await Booking.create(data);
      return booking;
    } catch (error) {
      throw error;
    }
  }
  async update(bookingId, data) {
    try {
      const booking = await Booking.findByPk(bookingId);
      if (data.status) {
        booking.status = data.status;
      }
      await booking.save();
      return booking;
    } catch (error) {
      console.log("repo layer error update");
      throw error;
    }
  }
}

module.exports = BookingRepository;
