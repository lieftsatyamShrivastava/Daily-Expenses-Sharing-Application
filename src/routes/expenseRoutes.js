// src/routes/expenseRoutes.js
const express = require('express');
const { addExpense, getExpensesByUser, downloadBalanceSheet } = require('../controllers/expenseController');

const router = express.Router();

// Route to add an expense
router.post('/expenses', addExpense);

// Route to get expenses by user
router.get('/users/:userId/expenses', getExpensesByUser);

// Route to download balance sheet
router.get('/users/:userId/balance-sheet/download', downloadBalanceSheet);

module.exports = router;
