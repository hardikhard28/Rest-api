const jwt = require("jsonwebtoken");
class JwtService {
  static sign(payload, expire = "1000s", SECRET_KEY = process.env.SECRET) {
    return jwt.sign(payload, process.env.SECRET, { expiresIn: expire });
  }
  static verify(token, SECRET_KEY = process.env.SECRET) {
    return jwt.verify(token, process.env.SECRET);
  }
}

module.exports = { JwtService };
