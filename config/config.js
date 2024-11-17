// config/Database.js
const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

class Database {
  constructor() {
    this.client = new Pool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
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
