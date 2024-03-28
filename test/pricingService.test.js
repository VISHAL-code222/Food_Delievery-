const { calculateTotalPrice } = require('../src/services/pricingService');

describe('calculateTotalPrice function', () => {
  it('should calculate total price correctly for valid input', async () => {
   
    const zone = 'central';
    const organizationId = '005';
    const totalDistance = 12;
    const itemType = 'perishable';

    
    const totalPrice = await calculateTotalPrice(zone, organizationId, totalDistance, itemType);

   
    expect(totalPrice).toBe(20.5); // 
  });

  it('should throw an error for invalid input', async () => {
    
    const zone = 'central';
    const totalDistance = 12;
    const itemType = 'perishable';

    
    try {
      await calculateTotalPrice(zone, null, totalDistance, itemType);
     
      expect(true).toBe(false); //
    } catch (error) {
      
      expect(error.message).toBe('Missing required fields in request');
    }
  });
});
