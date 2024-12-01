const SubCategory = require("../../models/SubCategory");
const Controller = require("../Controller");

class CategoryController extends Controller {
  constructor() {
    super();
    this.model = new SubCategory();
  }

  //   getCategories(req, res) {
  //     // cara tanpa bind
  //     super.handleRequest(res, () => this.model.getCategories(this.model));
  //   }

  getSubCategoriesByUser(req, res) {
    const { userId } = req.params;
    super.handleRequest(res, this.model.getSubCategoryByUser.bind(this.model), [
      userId,
    ]);
  }

  //   getCategory(req, res) {
  //     const { categoryId } = req.params;
  //     super.handleRequest(res, this.model.getCategory.bind(this.model), [
  //       categoryId,
  //     ]);
  //   }

  async addSubCategory(req, res) {
    const { categoryId, userId, name } = req.body;
    super.handleRequestProccess(res, () =>
      this.model.inputSubCategory({ categoryId, name, userId })
    );
  }
}

module.exports = CategoryController;
