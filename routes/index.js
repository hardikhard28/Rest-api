const express = require("express");
const { registerController } = require("../controller/registerController");
const { loginController } = require("../controller/loginController");
const { userController } = require("../controller/userController");
const { auth } = require("../middleware/auth");
const { refreshController } = require("../controller/refreshController");
const { token } = require("../controller/token");
const { lol } = require("../controller/lol");
const { productController } = require("../controller/productController");
const { admin } = require("../middleware/admin");

const router = express.Router();

router.post("/register", registerController.register);
router.post("/login", loginController.login);
router.get("/about", auth, userController.userInfo);
router.post("/refresh", refreshController.refresh);
router.post("/logout", auth, loginController.logout);
router.post("/product", [auth, admin], productController.store);
router.put("/product/:id", productController.update);
router.delete("/product/:id", productController.delete);
router.get("/product/:id", productController.fetchPro);
router.get("/products", productController.products);
router.get("/lol", lol.store);

module.exports = { router };
