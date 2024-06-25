const sender = require("../config/emailConfig");
const TicketRepository = require("../repository/ticket-repository");

const repo = new TicketRepository();

const sendBasicEmail = async (mailfrom, mailto, mailSubject, mailBody) => {
  try {
    sender.sendMail({
      from: mailfrom,
      to: mailto,
      subject: mailSubject,
      text: mailBody,
    });
  } catch (error) {
    console.log(error);
  }
};
const updateTicket = async (ticketid, data) => {
  try {
    const response = await repo.update(ticketid, data);
    return response;
  } catch (error) {
    console.log("error");
  }
};
const fetchPendingEmails = async () => {
  try {
    const response = await repo.get({ status: "PENDING" });
    return response;
  } catch (error) {
    console.log("error");
  }
};

const createNotification = async (data) => {
  try {
    const response = await repo.create(data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const subscribeEvents = async (payload) => {
  let service = payload.service;
  let data = payload.data;
  switch (service) {
    case "CREATE_TICKET":
      await createNotification(data);
      break;
    case "SEND_BASIC_EMAIL":
      await sendBasicEmail(
        data.mailfrom,
        data.mailto,
        data.mailSubject,
        data.mailBody
      );
      break;
    default:
      console.log("NO valid events");
      break;
  }
};

module.exports = {
  sendBasicEmail,
  fetchPendingEmails,
  createNotification,
  updateTicket,
  subscribeEvents,
};
