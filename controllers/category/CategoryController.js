const Category = require("../../models/Category");
const Controller = require("../Controller");

class CategoryController extends Controller {
  constructor() {
    super();
    this.model = new Category();
  }

  getCategories(req, res) {
    // cara tanpa bind
    super.handleRequest(res, () => this.model.getCategories(this.model));
  }

  getCategoriesByUser(req, res) {
    const { userId } = req.params;
    super.handleRequest(res, this.model.getCategoryByUser.bind(this.model), [
      userId,
    ]);
  }

  getCategory(req, res) {
    const { categoryId } = req.params;
    super.handleRequest(res, this.model.getCategory.bind(this.model), [
      categoryId,
    ]);
  }

  async addCategory(req, res) {
    const { category, userId } = req.body;
    super.handleRequestProccess(res, () =>
      this.model.inputCategory({ category, userId })
    );
  }

  async deleteCategory(req, res) {
    const { categoryId } = req.params;
    super.handleRequestProccess(res, () =>
      this.model.deleteCategory(categoryId)
    );
  }

  async updateCategory(req, res) {
    const { categoryId } = req.params;
    const { category } = req.body;
    super.handleRequestProccess(res, () =>
      this.model.updateCategory(categoryId, "id", { category })
    );
  }
}

module.exports = CategoryController;
