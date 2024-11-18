const User = require("../../models/User");
const Controller = require("../Controller");
const Validation = require("../../middlewares/Validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

class UserController extends Controller {
  constructor() {
    super();
    this.user = new User();
    this.validation = new Validation();
  }

  getUsers(req, res) {
    // cara tanpa bind
    super.handleRequest(res, () => this.user.getUsers(this.user));
  }

  getUser(req, res) {
    const { userId } = req.params;
    super.handleRequest(res, this.user.getUser.bind(this.user), [userId]);
  }

  test(req, res) {
    super.handleRequest(res, () => this.user.test());
  }

  async inputUser(req, res) {
    const isValid = await this.validation.userInputValidation(req);
    if (isValid != true) {
      res.status(400).json(isValid);
    } else {
      const { name, email, pass } = req.body;
      super.handleRequestProccess(res, () =>
        this.user.inputUser({ name, email, pass })
      );
    }
  }

  async login(req, res) {
    // Validasi input login
    const isValid = await this.validation.loginValidation(req);
    if (isValid !== true) {
      return res.status(400).json(isValid);
    }

    const { email, pass } = req.body;

    try {
      // Cari user berdasarkan email
      const user = await this.user.getUserByEmail(email);
      if (!user[0]) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Verifikasi password
      const isMatch = await bcrypt.compare(pass, user[0].password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Invalid credentials for password" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user[0].id, email: user[0].email },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h", // Token valid selama 1 jam
        }
      );

      return res.json({ message: "Login successful", token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  }

  getUserCurrent(req, res) {
    return this.decodedJWT(req, res);
  }

  getUserCurrent(req, res) {
    jwt.verify(
      req.headers["authorization"],
      process.env.JWT_SECRET,
      (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: "Invalid token" });
        }
        return res.status(200).json({
          message: "Users data fetched successfully",
          userId: decoded.userId,
          email: decoded.email,
        });
      }
    );
  }
}

module.exports = UserController;
