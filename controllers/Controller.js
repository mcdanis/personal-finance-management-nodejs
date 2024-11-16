class Controller {
  async handleRequest(res, serviceMethod, params = []) {
    try {
      const result = await serviceMethod(...params);
      res.status(200).json(result);
    } catch (error) {
      res.json({
        error: true,
        message: error.message,
      });
    }
  }
}

module.exports = Controller;
