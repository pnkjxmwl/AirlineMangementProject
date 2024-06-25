const validateUserAuth = (req, resp, next) => {
  if (!req.body.email || !req.body.password) {
    return resp.status(400).json({
      success: false,
      data: {},
      message: "something went wrong",
      err: "email or password missing ",
    });
  }
  next();
};
const validateIsAdminRequest = (req, resp, next) => {
  if (!req.body.id) {
    return resp.status(400).json({
      success: false,
      data: {},
      message: "something went wrong",
      err: "id not present",
    });
  }
  next();
};

module.exports = {
  validateUserAuth,
  validateIsAdminRequest,
};
