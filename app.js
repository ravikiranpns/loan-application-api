const express = require('express');
const app = express();
const loanRoutes = require('./routes/loanRoutes');
require('dotenv').config();

app.use(express.json());
app.use('/loan-applications', loanRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
