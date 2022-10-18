const { JwtService } = require("../services/JwtService");
const { CustomErrorHandler } = require("../services/CustomErrorHandler");
const auth = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return next(CustomErrorHandler.unAuthorised("Not allowed to access"));
  }
  try {
    const { _id, role } = await JwtService.verify(token);
    req.user = {};
    req.user._id = _id;
    req.user.role = role;
    next();
  } catch (error) {
    console.log(error)
    return next(CustomErrorHandler.unAuthorised("fuck youuu allowed to access"));
    // return next(CustomErrorHandler.notFound("Not allowed to access"));
  }
};
module.exports = { auth };
