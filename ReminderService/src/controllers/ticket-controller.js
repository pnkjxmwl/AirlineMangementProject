const TicketService = require("../services/email-service");

const create = async (req, resp) => {
  try {
    const response = await TicketService.createNotification(req.body);
    return resp.status(201).json({
      success: true,
      data: response,
      err: {},
      message: "succesfully register notification",
    });
  } catch (error) {
    console.log(error);
    return resp.status(500).json({
      success: false,
      data: {},
      err: error,
      message: "Not succesfull in register notification",
    });
  }
};
module.exports = {
  create,
};
