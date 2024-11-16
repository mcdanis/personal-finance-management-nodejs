// config/Database.js
const { Pool } = require("pg");

class Database {
  constructor() {
    this.client = new Pool({
      host: "localhost",
      port: 5432,
      user: "mcdani",
      password: "dani",
      database: "personal_finance",
    });
  }

  async close() {
    try {
      await this.client.end();
      console.log("Koneksi ke PostgreSQL ditutup.");
    } catch (err) {
      console.error("Gagal menutup koneksi:", err);
    }
  }
}

module.exports = Database;
