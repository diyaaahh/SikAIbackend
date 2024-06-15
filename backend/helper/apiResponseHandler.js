const HttpStatus = require("../constant/constants.js");
const sendSuccessResponse = ({
  res,
  data = null,
  statusCode = HttpStatus.OK,
  message = "",
}) => {
  return res.status(200).json({
    status: "ok",
    ...(data && { data }),
    ...(message && { message }),
  });
};

module.exports = sendSuccessResponse;
