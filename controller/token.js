const jwt = require("jsonwebtoken");
const token = () => {
  const result = jwt.sign({ id: "12344" }, "JNCDKCDKCLMD", {
    expiresIn: "2h",
  });
  console.log(result);
  try {
    const ver = jwt.verify(result, "JNCDKCDKCLMD");
    console.log(ver);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { token };
