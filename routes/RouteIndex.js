const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user/UserController");
const AccountController = require("../controllers/account/AccountController");
const CategoryController = require("../controllers/category/CategoryController");

const userController = new UserController();
const accountController = new AccountController();
const categoryController = new CategoryController();

// http://localhost:3001/api

// user
router.get("/users", (req, res) => userController.getUsers(req, res));
router.get("/user/:userId", (req, res) => userController.getUser(req, res));
router.post("/user", (req, res) => userController.inputUser(req, res));

// account
router.get("/accounts", (req, res) => accountController.getAccounts(req, res));
router.get("/account/:accountId", (req, res) =>
  accountController.getAccount(req, res)
);

// category
router.get("/categories", (req, res) =>
  categoryController.getCategories(req, res)
);
router.get("/category/:categoryId", (req, res) =>
  categoryController.getCategory(req, res)
);

module.exports = router;
