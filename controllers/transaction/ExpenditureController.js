class ExpenditureController {
  constructor() {
    this.db = new Database();
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
}

module.exports = ExpenditureController;
