const User = require("../Model/userModel");
const { CustomErrorHandler } = require("../services/customErrorHandler");
const admin = async (req, res, next) => {
  console.log(req.user);
  try {
    const user = await User.findById({ _id: req.user._id });
    console.log(user);
    if (req.user.role == "admin") {
    
      next();
    } else {
        console.log("lol")
      return next(CustomErrorHandler.unAuthorised());
    }
  } catch (error) {
    return next(CustomErrorHandler.servererror());
  }
};
module.exports = { admin };
