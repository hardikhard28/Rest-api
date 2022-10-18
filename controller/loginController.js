const Joi = require("joi");
const User = require("../Model/userModel");
const refToken = require("../Model/refreshToken");
const { CustomErrorHandler } = require("../services/customErrorHandler");
const bcrypt = require("bcrypt");
const { JwtService } = require("../services/JwtService");

const loginController = {
  async login(req, res, next) {
    const schema = Joi.object({
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),

      password: Joi.string().min(3).max(30).required(),
    });
    console.log(req.body);

    const { error } = schema.validate(req.body);

    // console.log(error);

    if (error) {
      return next(error);
      //   throw error;
    }

    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return next(
          CustomErrorHandler.userDoesntExists("User doesnt exist bitch")
        );
      }

      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) {
        return next(
          CustomErrorHandler.wrongcreds("Wrong password or email idk")
        );
      }
      console.log("ulll here");
      const accessToken = JwtService.sign({
        _id: user._id,
        role: user.role,
      });
      const refreshToken = JwtService.sign(
        {
          _id: user._id,
          role: user.role,
        },
        "1y"
      );
      await refToken.create({ token: refreshToken });
      res.json({ token: accessToken, refreshToken: refreshToken });
    } catch (error) {
      console.log(error);
    }
  },
  async logout(req, res, next) {
    try {
      const response = await refToken.deleteOne({
        token: req.body.refreshtoken,
      });
    } catch (error) {
      return next(new Error("Something went wrong"));
    }
    res.json({ status: 1 });
  },
};
module.exports = { loginController };
