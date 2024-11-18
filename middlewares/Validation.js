const { body, validationResult } = require("express-validator");

class Validation {
  async userInputValidation(req) {
    await body("name")
      .isLength({ max: 50 })
      .withMessage("Name must be less than 50 characters.")
      .notEmpty()
      .withMessage("Name is required.")
      .run(req);

    await body("email")
      .isEmail()
      .withMessage("Please enter a valid email address.")
      .notEmpty()
      .withMessage("Email is required.")
      .run(req);

    await body("pass")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long.")
      .matches(/\d/)
      .withMessage("Password must contain at least one number.")
      .notEmpty()
      .withMessage("Password is required.")
      .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return { errors: errors.array() };
    }

    return true;
  }

  async loginValidation(req) {
    await body("email")
      .isEmail()
      .withMessage("Please enter a valid email address.")
      .notEmpty()
      .withMessage("Email is required.")
      .run(req);

    await body("pass").notEmpty().withMessage("Password is required.").run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return { errors: errors.array() };
    }

    return true;
  }
}

module.exports = Validation;
