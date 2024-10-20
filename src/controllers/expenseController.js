const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const generateCSV = require('../utils/csvGenerator'); // Ensure you have this utility

// Function to add an expense
exports.addExpense = async (req, res) => {
  const { description, amount, splitMethod, participants, createdById } = req.body;

  try {
    const expense = await prisma.expense.create({
      data: {
        description,
        amount,
        splitMethod,
        createdById,
        participants: {
          create: participants.map((p) => ({
            userId: p.userId,
            shareAmount: p.shareAmount,
          })),
        },
      },
    });
//error handling 
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Function to get expenses by user
exports.getExpensesByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const expenses = await prisma.expense.findMany({
      where: { createdById: parseInt(userId) },
      include: { participants: true },
    });

    res.json(expenses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// doulading balaSheet 
exports.downloadBalanceSheet = async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch individual expenses for the user
    const expenses = await prisma.expense.findMany({
      where: { createdById: parseInt(userId) },
      include: {
        participants: {
          include: {
            user: true, // Include user information for each participant
          },
        },
      },
    });

    
    const balanceSheetData = expenses.map(expense => {
      return {
        description: expense.description,
        totalAmount: expense.amount,
        date: expense.createdAt.toISOString().split('T')[0], // Format date as YYYY-MM-DD
        participants: expense.participants.map(participant => `${participant.user.name}: ${participant.shareAmount}`).join(', '),
      };
    });

    // Generate CSV
    const csv = generateCSV(balanceSheetData);

    // Set headers and send the CSV file
    res.header('Content-Type', 'text/csv');
    res.attachment('balance_sheet.csv');
    res.status(200).send(csv);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to download balance sheet." });
  }
};
