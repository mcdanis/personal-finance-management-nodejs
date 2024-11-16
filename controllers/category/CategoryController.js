const Category = require("../../models/Category");
const Controller = require("../Controller");

class CategoryController extends Controller {
  constructor() {
    super();
    this.con = new Category();
  }

  getCategories(req, res) {
    // cara tanpa bind
    super.handleRequest(res, () => this.con.getCategories(this.con));
  }

  getCategory(req, res) {
    const { categoryId } = req.params;
    super.handleRequest(res, this.con.getCategory.bind(this.con), [categoryId]);
  }
}

module.exports = CategoryController;
