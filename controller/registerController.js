const Joi = require("joi");
const User = require("../Model/userModel");
const refToken = require("../Model/refreshToken");
const { CustomErrorHandler } = require("../services/customErrorHandler");
const bcrypt = require("bcrypt");
const { JwtService } = require("../services/JwtService");
const registerController = {
  async register(req, res, next) {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),

      password: Joi.string().min(3).max(30).required(),

      repeat_password: Joi.ref("password"),
    });
    console.log(req.body);

    const { error } = schema.validate(req.body);

    // console.log(error);

    if (error) {
      return next(error);
      //   throw error;
    }

    //next check if the user exists
    // const
    try {
      const found = await User.exists({ email: req.body.email });
      if (found) {
        return next(
          CustomErrorHandler.userExists(
            409,
            "This email id is already registerd"
          )
        );
      }
    } catch (error) {}
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    let accessToken;
    let refreshToken;
    try {
      const result = await user.save();
      console.log("done");
      accessToken = JwtService.sign({
        _id: result._id,
        role: result.role,
      });
      refreshToken = JwtService.sign(
        {
          _id: result._id,
          role: result.role,
        }
      );
      await refToken.create({ token: refreshToken });
    } catch (error) {
      console.log(error);
    }

    res.json({ accessToken: accessToken, refreshToken: refreshToken });
  },
};

module.exports = { registerController };
