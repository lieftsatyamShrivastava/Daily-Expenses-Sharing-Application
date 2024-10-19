const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

// Register a new user
exports.registerUser = async (req, res) => {
  const { name, email, mobile, password } = req.body;
  
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user in the database
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        mobile,
        password: hashedPassword,
      },
    });

    res.status(201).json(newUser);  // Return the created user data
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a user by ID
exports.getUser = async (req, res) => {
  const { id } = req.params;
  
  try {
    // Find the user by the unique ID, making sure to parse the ID as an integer
    const user = await prisma.user.findUnique({ 
      where: { id: parseInt(id) }  // Convert the ID to an integer
    });
    
    // Check if the user exists and return the result
    if (user) {
      res.json(user);  // Return the user if found
    } else {
      res.status(404).json({ error: 'User not found' });  // Return a 404 error if user doesn't exist
    }
  } catch (error) {
    res.status(400).json({ error: error.message });  // Return any other error
  }
};
