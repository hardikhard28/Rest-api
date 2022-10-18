const Joi = require("joi");
const refToken = require("../Model/refreshToken");
const User = require("../Model/userModel");
const { CustomErrorHandler } = require("../services/customErrorHandler");
const { JwtService } = require("../services/JwtService");
const refreshController = {
  async refresh(req, res, next) {
    // console.log(req.body.refreshtoken);
    const schema = Joi.object({
      refreshtoken: Joi.string(),
    });

    const { error } = schema.validate(req.body);

    // console.log(error);
    let refreshToken;
    if (error) {
      console.log("error found in joi");
      return next(error);   
      //   throw error;
    }
    const { refreshtoken } = req.body;
    // console.log(refreshtoken);
    try {
      resulttoken = await refToken.findOne({ token: refreshtoken });
      console.log("came here");
      if (!resulttoken) {
        console.log("couldnt find refresh token");
        return next(CustomErrorHandler.unAuthorised("Invalid refresh token"));
      }
      let user_id;

      try {
        console.log(resulttoken.token)
        const { _id } = await JwtService.verify(resulttoken.token);
       
        user_id = _id;
      } catch (error) {
        console.log("chutiyaaa ref token");

        return next(CustomErrorHandler.unAuthorised("Invalid refresh token"));
      }
      const user = User.findOne({ _id: user_id });
      if (!user) {
        return next(CustomErrorHandler.userDoesntExists("No user found"));
      }
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
      return next(error);
    }
  },
};
module.exports = { refreshController };
