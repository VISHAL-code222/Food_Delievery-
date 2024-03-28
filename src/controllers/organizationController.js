const { getOrganizationById } = require('../models/organizationModel');

const getOrganization = async (req, res) => {
    try {
        const { organizationId } = req.params;

        
        const organization = await getOrganizationById(organizationId);

        if (!organization) {
            return res.status(404).json({ error: 'Organization not found' });
        }

        return res.status(200).json(organization);
    } catch (error) {
        console.error('Error fetching organization:', error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getOrganization,
};
