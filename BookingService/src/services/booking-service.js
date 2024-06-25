const { BookingRepository } = require("../repository/index");
const axios = require("axios");
const { FLIGHT_SERVICE_PATH } = require("../config/serverConfig");
const { createChannel, publishMessage } = require("../utils/messageQueue");
const { REMINDER_BINDING_KEY } = require("../config/serverConfig");
class BookingService {
  constructor() {
    this.bookingRepository = new BookingRepository();
  }

  async createBooking(data) {
    try {
      const flightId = data.flightId;
      let getFlightReqURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
      const response = await axios.get(getFlightReqURL);
      const flightData = response.data.data;

      let priceOfFlight = flightData.price;
      if (data.noOfSeats > flightData.totalSeats) {
        throw new ServiceError(
          "Something went wrong in booking service",
          "Insufficient Seats"
        );
      }
      const totalCost = priceOfFlight * data.noOfSeats;

      const bookingPayload = { ...data, totalCost };
      const booking = await this.bookingRepository.create(bookingPayload);
      const updateFlightReqURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
      axios.patch(updateFlightReqURL, {
        totalSeats: flightData.totalSeats - booking.noOfSeats,
      });
      const finalbooking = await this.bookingRepository.update(booking.id, {
        status: "Booked",
      });

      const channel = await createChannel();
      const payload = {
        data: {
          mailfrom: "pankajsemwalpankaj123@gmail.com",
          mailto: data.email,
          mailSubject: "Confirming your booking",
          mailBody: "This is auto genereated message confirming your booking",
        },
        service: "SEND_BASIC_EMAIL",
      };
      publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(payload));

      return finalbooking;
    } catch (error) {
      console.log("service layer error", error);

      throw error;
    }
  }
}

module.exports = BookingService;
