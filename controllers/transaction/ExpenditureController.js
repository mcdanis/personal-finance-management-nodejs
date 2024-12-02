const Expenditure = require("../../models/transaction/Expenditure");
const Controller = require("../Controller");

class ExpenditureController extends Controller {
  constructor() {
    this.model = new Expenditure();
  }

  async getTodayExpenditure() { }
  getMonthExpenditure() { }
  getWeekExpenditure() { }
  getHightExpenditureByDay() { }
  getHightExpenditureByWeek() { }
  getHightExpenditureByMonth() { }
  getLowtExpenditureByDay() { }
  getLowtExpenditureByWeek() { }
  getLowtExpenditureByMonth() { }

  addExpenditure(req, res) {
    const {
      userId,
      name,
      date,
      subCategoryId,
      value,
      description,
      accountId,
    } = req.body;

    super.handleRequestProccess(res, () =>
      this.model.inputExpenditure({
        userId,
        name,
        date,
        subCategoryId,
        value,
        description,
        accountId
      })
    );
  }
}

module.exports = ExpenditureController;
