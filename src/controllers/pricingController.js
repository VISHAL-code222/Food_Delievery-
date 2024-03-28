const { calculateTotalPrice } = require('../models/pricingModel');


const calculatePrice = async (req, res) => {
    try {
        const { zone, organization_id, total_distance, item_type } = req.body;

    
        if (!zone || !organization_id || !total_distance || !item_type) {
            return res.status(400).json({ error: 'Missing required fields in request body' });
        }

        const totalPrice = await calculateTotalPrice(zone, organization_id, total_distance, item_type);

      
        return res.status(200).json({ total_price: totalPrice });
    } catch (error) {
        console.error('Error calculating price:', error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    calculatePrice,
};
