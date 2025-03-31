const request = require('supertest');
const express = require('express');
const router = require('../routes/loanRoutes');

const app = express();
app.use(express.json());
app.use('/loan-applications', router);

jest.mock('../config/db', () => {
  return {
    query: jest.fn((query, values) => {
      if (query.includes('INSERT INTO loan_applications')) {
        return Promise.resolve({ rows: [{ id: 1 }] });
      } else if (query.includes('SELECT la.*, c.name, c.email')) {
        return Promise.resolve({
          rows: [{
            id: 1,
            customer_id: 1,
            amount: 10000,
            term_months: 12,
            annual_interest_rate: 5,
            monthly_payment: 856.07,
            name: 'John Doe',
            email: 'john@example.com'
          }]
        });
      }
      return Promise.resolve({ rows: [] });
    })
  };
});

describe('Loan Application API', () => {
  test('POST /loan-applications should return application id', async () => {
    const res = await request(app)
      .post('/loan-applications')
      .send({
        customer_id: 1,
        amount: 10000,
        term_months: 12,
        annual_interest_rate: 5
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  test('GET /loan-applications/:id should return loan data with customer info', async () => {
    const res = await request(app).get('/loan-applications/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('name', 'John Doe');
  });
});
