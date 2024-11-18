const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../../models/User");
const dotenv = require("dotenv");

dotenv.config();

class AuthController {}

module.exports = new AuthController();
