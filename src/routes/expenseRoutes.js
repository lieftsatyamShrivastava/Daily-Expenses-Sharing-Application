const express = require('express');
const { addExpense, getExpensesByUser } = require('../controllers/expenseController');
const router = express.Router();

router.post('/add', addExpense);
router.get('/user/:userId', getExpensesByUser);

module.exports = router;
