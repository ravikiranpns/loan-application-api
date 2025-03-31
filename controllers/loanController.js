const db = require('../config/db');
const calculateMonthlyPayment = require('../utils/calculateMonthlyPayment');

exports.createLoan = async (req, res) => {
  try {
    const { customer_id, amount, term_months, annual_interest_rate } = req.body;

    if (!customer_id || !amount || !term_months || !annual_interest_rate) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const monthly_payment = calculateMonthlyPayment(amount, annual_interest_rate, term_months);

    const result = await db.query(
      `INSERT INTO loan_applications (customer_id, amount, term_months, annual_interest_rate, monthly_payment)
       VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [customer_id, amount, term_months, annual_interest_rate, monthly_payment]
    );

    res.status(201).json({ id: result.rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getLoanById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query(
      `SELECT la.*, c.name, c.email
       FROM loan_applications la
       JOIN customers c ON la.customer_id = c.id
       WHERE la.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
