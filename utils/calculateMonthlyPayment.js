function calculateMonthlyPayment(P, annualRate, n) {
  const r = annualRate / 12 / 100;
  const M = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  return parseFloat(M.toFixed(2));
}

module.exports = calculateMonthlyPayment;
