const { Client } = require("pg");

// Membuat koneksi ke database PostgreSQL
const client = new Client({
  host: "localhost", // Host PostgreSQL (biasanya 'localhost' untuk pengembangan lokal)
  port: 5432, // Port PostgreSQL, defaultnya adalah 5432
  user: "mcdani", // Ganti dengan username PostgreSQL yang sesuai
  password: "dani", // Ganti dengan password PostgreSQL yang sesuai
  database: "blogger", // Ganti dengan nama database yang sesuai
});

// Menyambungkan ke database
client
  .connect()
  .then(() => console.log("Koneksi ke PostgreSQL berhasil!"))
  .catch((err) => console.error("Gagal menghubungkan ke PostgreSQL:", err));

module.exports = client;
