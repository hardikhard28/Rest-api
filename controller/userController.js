const User = require("../Model/userModel");
const { CustomErrorHandler } = require("../services/customErrorHandler");
const { JwtService } = require("../services/JwtService");
const userController = {
  async userInfo(req, res, next) {
    try {
      const user = await User.findOne({ _id: req.user._id }).select('-password ');
      if (!user) {
        return next(CustomErrorHandler.notFound());
      }
      console.log(user)
      res.json(user);
    } catch (error) {
      next(CustomErrorHandler.notFound());
    }
  },
};

module.exports = { userController };
