const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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

    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

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
