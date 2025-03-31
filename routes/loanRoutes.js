const express = require('express');
const router = express.Router();
const { createLoan, getLoanById } = require('../controllers/loanController');

router.post('/', createLoan);
router.get('/:id', getLoanById);

module.exports = router;
