var express = require("express");
var router = express.Router();
const db = require("../config/config");

/* GET home page. */
router.get("/", async (req, res, next) => {
  const result = await db.query("SELECT * FROM users");
  res.json(result.rows);
});

module.exports = router;
