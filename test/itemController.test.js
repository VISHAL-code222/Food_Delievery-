const request = require('supertest');
const app = require('../index'); 
const { getItemById } = require('../models/itemModel');

jest.mock('../models/itemModel'); 

describe('GET /api/items/:itemId', () => {
  it('should return item details when item exists', async () => {
    
    const mockItem = { id: 1, type: 'perishable', description: 'Some perishable item' };
    getItemById.mockResolvedValueOnce(mockItem);

   
    const response = await request(app).get('/api/items/1');

  
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockItem);
  });

  it('should return 404 error when item does not exist', async () => {
   
    getItemById.mockResolvedValueOnce(null);

   
    const response = await request(app).get('/api/items/999');

    
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Item not found' });
  });

  it('should return 500 error when internal server error occurs', async () => {
   
    getItemById.mockRejectedValueOnce(new Error('Test error'));

    
    const response = await request(app).get('/api/items/1');

   
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Internal server error' });
  });
});
