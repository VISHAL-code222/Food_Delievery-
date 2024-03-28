const { Pool } = require('pg');


const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});


const getOrganizationById = async (organizationId) => {
  try {
    const query = 'SELECT * FROM organization WHERE id = $1';
    const { rows } = await pool.query(query, [organizationId]);
    return rows[0];
  } catch (error) {
    throw new Error(`Error fetching organization: ${error.message}`);
  }
};

module.exports = {
  getOrganizationById,
};
