const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes.js');

const app = express();


app.use(bodyParser.json());

//  used routs for user 
app.use('/api/users', userRoutes);
// used routs for the expenses
app.use('/api/expenses', expenseRoutes);
// use routs for  expenses 
app.get('/api/users/:userId/expenses', async (req, res) => {
    const { userId } = req.params;
    try {
      const expenses = await prisma.expense.findMany({
        where: { createdBy: Number(userId) },
        include: {
          splits: {
            include: {
              user: true,
            },
          },
        },
      });
      res.status(200).json(expenses);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve expenses." });
    }
  });
// used routs for overall expenses
  app.get('/api/expenses/overall', async (req, res) => {
    try {
      const users = await prisma.user.findMany({
        include: {
          splits: {
            include: {
              expense: true,
            },
          },
        },
      });
  
      const overallExpenses = users.map(user => {
        const totalAmountOwed = user.splits.reduce((total, split) => {
          return total + split.amount;
        }, 0);
        return {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
          totalAmountOwed,
        };
      });
      
      res.status(200).json(overallExpenses);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve overall expenses." });
    }
  });

module.exports = app;
