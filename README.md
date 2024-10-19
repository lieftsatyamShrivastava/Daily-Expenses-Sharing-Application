## Daily Expenses Sharing Application
This project contains a simple TODO application it has the following features-


```text
http://localhost:3000/api/users/register
```
```json
{

    "name":"satyam ",
    "email":"satyam@example.com",
    "password":"YNgyxNNcDUy",
    "mobile": "1234567891"
}
```
```text
https://localhost:3000/api/expenses/add
```

```json

{
    "description": "Party",
    "amount": 4000,
    "splitMethod": "PERCENTAGE",
    "participants": [
        {
            "userId": 4,
            "shareAmount": 345
        }
    ],
    "createdById": 4
}
```

## Overview A backend application for managing and splitting expenses among users. The app supports various split methods such as equal splits, exact amounts, and percentage-based splits. 
 - Features - Add, update, and delete expenses - Split expenses equally or based on specific amounts or percentages - View balance sheets to track who owes whom - User management (create, list, update, delete users) - Downloadable reports 
## File Structure
-  Setup 1. Clone the repository: 
```bash 
git clone <repository_url> cd expense-sharing-app 
```
-  2. Install dependencies: ```bash npm install ```
-  3. Set up environment variables: Create a `.env` file in the root directory and add your environment variables (e.g., database credentials).
-  4. Run the application: ```bash npm run dev ``` ## Technologies - Node.js - Express.js - Sequelize ORM - PostgreSQL/MySQL ## API Endpoints - `POST /users`: Create a new user - `GET /users`: List all users - `POST /expenses`: Add a new expense - `GET /expenses`: List all expenses - `GET /balancesheet`: View the balance sheet 
- ## License This project is licensed under the MIT License.