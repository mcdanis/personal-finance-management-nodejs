const Account = require("../../models/Account");
const Controller = require("../Controller");

class AccountController extends Controller {
  constructor() {
    super();
    this.model = new Account();
  }

  getAccounts(req, res) {
    // cara tanpa bind
    super.handleRequest(res, () => this.model.getAccounts(this.model));
  }

  getAccount(req, res) {
    const { accountId } = req.params;
    super.handleRequest(res, this.model.getAccount.bind(this.model), [accountId]);
  }

  async addAccount(req, res) {
    const { accountName, ballance, type, userId } = req.body;
    super.handleRequestProccess(res, () =>
      this.model.inputAccount({ accountName, ballance, type, userId })
    );
  }

  getAccounts(req, res) {
    const { userId } = req.params;
    super.handleRequest(res, this.model.getAccountUser.bind(this.model), [userId]);
  }

  deleteAccount(req, res) {
    const { accountId } = req.params;
    super.handleRequestProccess(res, () => this.model.deleteAccount(accountId));
  }

  updateAccount(req, res) {
    const { accountId } = req.params;
    const { accountName, ballance, type } = req.body;
    super.handleRequestProccess(res, () => this.model.updateAccount(accountId, 'id', { accountName, ballance, type }));
  }
}

module.exports = AccountController;
