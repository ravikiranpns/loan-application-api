const calculateMonthlyPayment = require('../utils/calculateMonthlyPayment');

test('correctly calculates monthly payment', () => {
  const payment = calculateMonthlyPayment(10000, 5, 12);
  expect(payment).toBeCloseTo(856.07, 2);
});