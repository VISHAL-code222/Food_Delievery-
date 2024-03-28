const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});


const getItemById = async (itemId) => {
  try {
    const query = 'SELECT * FROM item WHERE id = $1';
    const { rows } = await pool.query(query, [itemId]);
    return rows[0];
  } catch (error) {
    throw new Error(`Error fetching item: ${error.message}`);
  }
};

module.exports = {
  getItemById
};
