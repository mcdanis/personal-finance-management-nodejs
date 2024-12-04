class TransactionService {
  constructor() {}

  static convertTimeFrame(timeFrame) {
    let timeFrameConverted;
    switch (timeFrame) {
      case "today":
        timeFrameConverted = new Date();
        break;

      default:
        break;
    }

    return Intl.DateTimeFormat("en-CA").format(timeFrameConverted);
  }
}

module.exports = TransactionService;
