## Daily Expenses Sharing Application
This project contains a simple TODO application it has the following features-

## Overview A backend application for managing and splitting expenses among users. The app supports various split methods such as equal splits, exact amounts, and percentage-based splits. 
 - Features - Add, update, and delete expenses - Split expenses equally or based on specific amounts or percentages - View balance sheets to track who owes whom - User management (create, list, update, delete users) - Downloadable reports 
## File Structure
-  Setup 1. Clone the repository: ```bash git clone <repository_url> cd expense-sharing-app ```
-  2. Install dependencies: ```bash npm install ```
-  3. Set up environment variables: Create a `.env` file in the root directory and add your environment variables (e.g., database credentials).
-  4. Run the application: ```bash npm run dev ``` ## Technologies - Node.js - Express.js - Sequelize ORM - PostgreSQL/MySQL ## API Endpoints - `POST /users`: Create a new user - `GET /users`: List all users - `POST /expenses`: Add a new expense - `GET /expenses`: List all expenses - `GET /balancesheet`: View the balance sheet 
- ## License This project is licensed under the MIT License.