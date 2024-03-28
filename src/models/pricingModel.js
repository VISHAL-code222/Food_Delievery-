const { Pool } = require('pg');


const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});


const getPricingDetails = async (organizationId, zone, itemType) => {
  try {
    const query = `
      SELECT base_distance_in_km, km_price, fix_price
      FROM pricing
      WHERE organization_id = $1 AND zone = $2 AND item_id = (
        SELECT id FROM item WHERE type = $3
      )
    `;
    const { rows } = await pool.query(query, [organizationId, zone, itemType]);
    return rows[0];
  } catch (error) {
    throw new Error(`Error fetching pricing details: ${error.message}`);
  }
};

module.exports = {
  getPricingDetails,
};
