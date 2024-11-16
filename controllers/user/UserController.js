const User = require("../../models/User");
const Controller = require("../Controller");

class UserController extends Controller {
  constructor() {
    super();
    this.user = new User();
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
    const { name, email } = req.body;
    if (!name || !email) {
      throw new Error("Name and email are required.");
    }
    const user = await this.user.inputUser({ name, email });
    res.json({
      name: user,
    });
  }
}

module.exports = UserController;
