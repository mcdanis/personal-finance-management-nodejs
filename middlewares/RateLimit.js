const rateLimit = require("express-rate-limit");

const loginRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 5, // Maksimum 5 kali permintaan dalam waktu 15 menit
  message: "Terlalu banyak percobaan login. Coba lagi setelah beberapa menit.",
});

module.exports = loginRateLimit;
