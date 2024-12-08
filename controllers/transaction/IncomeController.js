const Income = require("../../models/transaction/Income");
const Controller = require("../Controller");
const TransactionService = require("../../services/TransactionService");

class IncomeController extends Controller {
  constructor() {
    super();
    this.model = new Income();
  }

  async getTodayExpenditure() {}
  getMonthExpenditure() {}
  getWeekExpenditure() {}
  getHightExpenditureByDay() {}
  getHightExpenditureByWeek() {}
  getHightExpenditureByMonth() {}
  getLowtExpenditureByDay() {}
  getLowtExpenditureByWeek() {}
  getLowtExpenditureByMonth() {}

  addIncome(req, res) {
    const {
      userId,
      name,
      date,
      sourceOfIncome,
      value,
      description,
      accountId,
    } = req.body;

    return super.handleRequestProccess(res, () =>
      this.model.inputIncome({
        userId,
        name,
        date,
        sourceOfIncome,
        value,
        description,
        accountId,
      })
    );
  }

  getIncome(req, res) {
    const { userId, timeFrame } = req.params;
    const timeFrameToDate = TransactionService.convertTimeFrame(timeFrame);
    super.handleRequest(res, this.model.getIncome.bind(this.model), [
      userId,
      timeFrameToDate,
    ]);
  }
}

module.exports = IncomeController;
