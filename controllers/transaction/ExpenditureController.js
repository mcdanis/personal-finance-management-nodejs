const Expenditure = require("../../models/transaction/Expenditure");
const Controller = require("../Controller");
const TransactionService = require("../../services/TransactionService");

class ExpenditureController extends Controller {
  constructor() {
    super();
    this.model = new Expenditure();
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

  addExpenditure(req, res) {
    const { userId, name, date, subCategoryId, value, description, accountId } =
      req.body;

    return super.handleRequestProccess(res, () =>
      this.model.inputExpenditure({
        userId,
        name,
        date,
        subCategoryId,
        value,
        description,
        accountId,
      })
    );
  }

  getExpenditure(req, res) {
    const { userId, timeFrame } = req.params;
    const timeFrameToDate = TransactionService.convertTimeFrame(timeFrame);
    super.handleRequest(res, this.model.getExpenditure.bind(this.model), [
      userId,
      timeFrameToDate,
    ]);
  }
}

module.exports = ExpenditureController;
