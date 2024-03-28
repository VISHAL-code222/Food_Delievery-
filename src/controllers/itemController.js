const { getItemById } = require('../models/itemModel');

const getItem = async (req, res) => {
    try {
        const { itemId } = req.params;

   
        const item = await getItemById(itemId);

      
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }

        return res.status(200).json(item);
    } catch (error) {
        console.error('Error fetching item:', error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getItem,
};
