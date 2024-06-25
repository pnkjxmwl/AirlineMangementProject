const { StatusCodes } = require("http-status-codes");
const { BookingService } = require("../services/index");

const bookingService = new BookingService();

const { createChannel, publishMessage } = require("../utils/messageQueue");

const { REMINDER_BINDING_KEY } = require("../config/serverConfig");

class BookingController {
  constructor() {}

  async sendMessageToQueue(req, resp) {
    const channel = await createChannel();
    const payload = {
      data: {
        subject: "This is a noti from queue",
        content: "some queue will subscribe this",
        recepientEmail: "pankajsemwalpankaj123@gmail.com",
        notificationTime: "2024-06-29T04:33:28",
      },
      service: "CREATE_TICKET",
    };
    publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(payload));
    return resp.status(200).json({
      message: "succes publish event",
    });
  }

  async create(req, resp) {
    try {
      const response = await bookingService.createBooking(req.body);
      return resp.status(StatusCodes.OK).json({
        data: response,
        message: "success in booking",
        err: {},
        success: true,
      });
    } catch (error) {
      console.log("controller error");

      return resp.status(error.statusCodes).json({
        data: {},
        name: error.name,
        message: error.message,
        err: error.explanation,
        success: false,
      });
    }
  }
}

module.exports = BookingController;

// const create = async (req,resp)=>{

//     try {
//         const response= await bookingService.createBooking(req.body)
//         return resp.status(StatusCodes.OK).json({
//             data:response,
//             message:'success in booking',
//             err:{},
//             success:true
//         })

//     } catch (error) {
//         console.log('controller error');

//         return resp.status(error.statusCodes).json({
//             data:{},
//             name:error.name,
//             message:error.message,
//             err:error.explanation,
//             success:false
//         })
//     }

// }

// module.exports={
//     create
// }
