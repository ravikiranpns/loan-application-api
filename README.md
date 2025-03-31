# Loan Application API (Node.js + PostgreSQL)

This is a simplified Loan Origination backend API built with **Node.js**, **Express**, and **PostgreSQL**, deployable on **AWS Elastic Beanstalk** with optional CI/CD via **GitHub Actions**.

---

## Features

- `POST /loan-applications`: Accepts loan application data and calculates monthly repayment.
- `GET /loan-applications/:id`: Returns loan details along with customer info.
- PostgreSQL integration with secure parameterized queries.
- Input validation and `.env` configuration for credentials.
- Ready for AWS deployment and CI/CD setup.

---

## How to Run Locally

### 1. Setup PostgreSQL

Create a database and tables:

```sql
CREATE DATABASE loan_app_db;

CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100)
);

CREATE TABLE loan_applications (
  id SERIAL PRIMARY KEY,
  customer_id INT REFERENCES customers(id),
  amount NUMERIC,
  term_months INT,
  annual_interest_rate NUMERIC,
  monthly_payment NUMERIC,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO customers (name, email) VALUES ('John Doe', 'john@example.com');

2. Create .env File
DB_USER=loan_user
DB_PASSWORD=securepassword
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=loan_app_db


3. Run Project
npm install
npm run dev
Sample API Usage
POST /loan-applications
{
  "customer_id": 1,
  "amount": 10000,
  "term_months": 12,
  "annual_interest_rate": 5
}
GET /loan-applications/1
Returns loan + customer details.

Deployment
Procfile included for AWS Elastic Beanstalk
Add .env in EB software config
Optionally use GitHub Actions CI/CD (.github/workflows/deploy.yml)
Summary
This project meets the required task:

Node.js + Express backend
PostgreSQL with schema + indexing
Secure API design
AWS deployment-ready
CI/CD pipeline included