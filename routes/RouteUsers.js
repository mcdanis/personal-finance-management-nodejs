var express = require("express");
var router = express.Router();

const UserController = require("../controllers/user/UserController");
const AccountController = require("../controllers/account/AccountController");
const CategoryController = require("../controllers/category/CategoryController");
const SubCategoryController = require("../controllers/category/SubCategoryController");
const auth = require("../middlewares/Auth");

const userController = new UserController();
const accountController = new AccountController();
const categoryController = new CategoryController();
const subCategoryController = new SubCategoryController();

// http://localhost:3001/api-user
router.post("/login", (req, res) => userController.login(req, res));

router.use(auth);

// USER
router.post("/user", (req, res) => userController.inputUser(req, res));
router.get("/user/:userId", (req, res) => userController.getUser(req, res));
router.get("/auth/current", (req, res) =>
  userController.getUserCurrent(req, res)
);

// ACCOUNT
router.get("/account/:accountId", (req, res) =>
  accountController.getAccount(req, res)
);
router.put("/account/:accountId", (req, res) =>
  accountController.updateAccount(req, res)
);
router.get("/accounts/:userId", (req, res) =>
  accountController.getAccounts(req, res)
);
router.post("/account", (req, res) => accountController.addAccount(req, res));
router.delete("/account/:accountId", (req, res) =>
  accountController.deleteAccount(req, res)
);

// CATEGORY
router.get("/categories/:userId", (req, res) =>
  categoryController.getCategoriesByUser(req, res)
);
router.get("/category/:categoryId", (req, res) =>
  categoryController.getCategory(req, res)
);
router.put("/category/:categoryId", (req, res) =>
  categoryController.updateCategory(req, res)
);
router.post("/category", (req, res) =>
  categoryController.addCategory(req, res)
);
router.delete("/category/:categoryId", (req, res) =>
  categoryController.deleteCategory(req, res)
);

//SUB CATEGORY
router.get("/sub-categories/:userId", (req, res) =>
  subCategoryController.getSubCategoriesByUser(req, res)
);
router.post("/sub-category", (req, res) =>
  subCategoryController.addSubCategory(req, res)
);
router.get("/sub-category/:subCategoryId", (req, res) =>
  subCategoryController.getSubCategory(req, res)
);
router.delete("/sub-category/:subCategoryId", (req, res) =>
  subCategoryController.deleteSubCategory(req, res)
);
router.put("/sub-category/:subCategoryId", (req, res) =>
  subCategoryController.updateSubCategory(req, res)
);

// transaction
router.get("/test", (req, res) => userController.test(req, res));

module.exports = router;
