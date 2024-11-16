var express = require("express");
var router = express.Router();
const UserController = require("../controllers/user/UserController");
const AccountController = require("../controllers/account/AccountController");

const userController = new UserController();
const accountController = new AccountController();

// http://localhost:3001/api-user

router.get("/user/:userId", (req, res) => userController.getUser(req, res));
router.get("/account/:accountId", (req, res) =>
  accountController.getAccount(req, res)
);

// transaction
router.get("/test", (req, res) => userController.test(req, res));

module.exports = router;
