class Controller {
  handleRequest(res, serviceMethod, params = []) {
    this.mainHandleRequest(res, serviceMethod, params, "get");
  }

  handleRequestProccess(res, serviceMethod, params = []) {
    this.mainHandleRequest(res, serviceMethod, params, "post");
  }

  async mainHandleRequest(res, serviceMethod, params, type) {
    try {
      const query = await serviceMethod(...params);
      let result = {
        error: false,
        message: "successfully",
      };
      if (type === "get") {
        result = query;
      }
      res.status(200).json(result);
    } catch (error) {
      const statusCode = error.statusCode || 500;
      res.status(statusCode).json({
        error: true,
        message: error.message,
      });
    }
  }
}

module.exports = Controller;
