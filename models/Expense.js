const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Expense = sequelize.define('Expense', {
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  splitMethod: {
    type: DataTypes.ENUM('equal', 'exact', 'percentage'),
    allowNull: false,
  },
});

module.exports = Expense;
