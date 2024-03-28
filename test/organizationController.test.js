const request = require('supertest');
const app = require('../index'); 
const { getOrganizationById } = require('../models/organizationModel');

jest.mock('../models/organizationModel'); 

describe('GET /api/organizations/:organizationId', () => {
  it('should return organization details when organization exists', async () => {
    
    const mockOrganization = { id: 1, name: 'Organization Name' };
    getOrganizationById.mockResolvedValueOnce(mockOrganization);

  
    const response = await request(app).get('/api/organizations/1');

   
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockOrganization);
  });

  it('should return 404 error when organization does not exist', async () => {
   
    getOrganizationById.mockResolvedValueOnce(null);

   
    const response = await request(app).get('/api/organizations/999');

   
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Organization not found' });
  });

  it('should return 500 error when internal server error occurs', async () => {
   
    getOrganizationById.mockRejectedValueOnce(new Error('Test error'));

   
    const response = await request(app).get('/api/organizations/1');

   
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Internal server error' });
  });
});
