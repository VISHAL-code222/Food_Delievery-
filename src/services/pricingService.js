const { Pool } = require('pg');


const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});


const calculateTotalPrice = async (zone, organization_id, total_distance, item_type) => {
  try {
 
    const query = `
      SELECT base_distance_in_km, km_price, fix_price
      FROM pricing
      WHERE organization_id = $1 AND zone = $2 AND item_id = (
        SELECT id FROM item WHERE type = $3
      )
    `;
    const { rows } = await pool.query(query, [organization_id, zone, item_type]);

    if (rows.length === 0) {
      throw new Error('No pricing data found for the provided parameters');
    }

    const { base_distance_in_km, km_price, fix_price } = rows[0];

    
    let totalPrice = fix_price;
    if (total_distance > base_distance_in_km) {
      const extraDistance = total_distance - base_distance_in_km;
      totalPrice += extraDistance * km_price;
    }

   
    totalPrice *= 100;

    return totalPrice;
  } catch (error) {
    throw new Error(`Error calculating total price: ${error.message}`);
  }
};

module.exports = {
  calculateTotalPrice,
};
