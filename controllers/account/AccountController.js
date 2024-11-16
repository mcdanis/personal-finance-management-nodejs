const Account = require("../../models/Account");
const Controller = require("../Controller");

class AccountController extends Controller {
  constructor() {
    super();
    this.con = new Account();
  }

  getAccounts(req, res) {
    // cara tanpa bind
    super.handleRequest(res, () => this.con.getAccounts(this.con));
  }

  getAccount(req, res) {
    const { accountId } = req.params;
    super.handleRequest(res, this.con.getAccount.bind(this.con), [accountId]);
  }
}

module.exports = AccountController;