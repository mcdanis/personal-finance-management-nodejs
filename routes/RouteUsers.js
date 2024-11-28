var express = require("express");
var router = express.Router();
const UserController = require("../controllers/user/UserController");
const AccountController = require("../controllers/account/AccountController");
const auth = require("../middlewares/Auth");

const userController = new UserController();
const accountController = new AccountController();

// http://localhost:3001/api-user
router.post("/login", (req, res) => userController.login(req, res));

router.use(auth);

// USER
router.post("/user", (req, res) => userController.inputUser(req, res));
router.get("/user/:userId", (req, res) => userController.getUser(req, res));
router.get("/auth/current", (req, res) => userController.getUserCurrent(req, res));

// ACCOUNT
router.get("/account/:accountId", (req, res) => accountController.getAccount(req, res));
router.put("/account/:accountId", (req, res) => accountController.updateAccount(req, res));
router.get("/accounts/:userId", (req, res) => accountController.getAccounts(req, res));
router.post("/account", (req, res) => accountController.addAccount(req, res));
router.delete("/account/:accountId", (req, res) => accountController.deleteAccount(req, res));

// transaction
router.get("/test", (req, res) => userController.test(req, res));

module.exports = router;
