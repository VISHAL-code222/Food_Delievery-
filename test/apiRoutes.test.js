const request = require('supertest');
const app = require('../index'); 

describe('GET /api/organizations/:organizationId', () => {
  it('should return organization details when organization exists', async () => {
    const response = await request(app).get('/api/organizations/1');

    expect(response.status).toBe(200);
    
  });

  it('should return 404 error when organization does not exist', async () => {
    const response = await request(app).get('/api/organizations/999');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Organization not found' });
  });
});

describe('GET /api/items/:itemId', () => {
  it('should return item details when item exists', async () => {
    const response = await request(app).get('/api/items/1');

    expect(response.status).toBe(200);
   
  });

  it('should return 404 error when item does not exist', async () => {
    const response = await request(app).get('/api/items/999');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Item not found' });
  });
});

describe('POST /api/calculate-price', () => {
  it('should calculate total price correctly for valid input', async () => {
   
    const requestBody = {
      zone: 'central',
      organization_id: '005',
      total_distance: 12,
      item_type: 'perishable'
    };

    const response = await request(app)
      .post('/api/calculate-price')
      .send(requestBody);

    expect(response.status).toBe(200);
   
  });

  it('should return 400 error for invalid input', async () => {
    
    const requestBody = {
      
    };

    const response = await request(app)
      .post('/api/calculate-price')
      .send(requestBody);

    expect(response.status).toBe(400);
   
  });
});
