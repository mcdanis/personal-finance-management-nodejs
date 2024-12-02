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

  getSubCategory(req, res) {
    const { subCategoryId } = req.params;
    super.handleRequest(res, this.model.getSubCategory.bind(this.model), [
      subCategoryId,
    ]);
  }

  async addSubCategory(req, res) {
    const { categoryId, userId, name } = req.body;
    super.handleRequestProccess(res, () =>
      this.model.inputSubCategory({ categoryId, name, userId })
    );
  }

  async deleteSubCategory(req, res) {
    const { subCategoryId } = req.params;
    super.handleRequestProccess(res, () =>
      this.model.deleteSubCategory(subCategoryId)
    );
  }

  async updateSubCategory(req, res) {
    const { subCategoryId } = req.params;
    const { categoryId } = req.body;
    const { name } = req.body;
    super.handleRequestProccess(res, () =>
      this.model.updateSubCategory(subCategoryId, "id", { categoryId, name })
    );
  }
}

module.exports = CategoryController;
