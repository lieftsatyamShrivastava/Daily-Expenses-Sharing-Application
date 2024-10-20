const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const { z } = require('zod');
const jwt = require('jsonwebtoken');

// Define the Zod schema for user registration validation
const userRegistrationSchema = z.object({
  name: z.string().min(2, { message: 'Name should be at least 2 characters long' }),
  email: z.string().email({ message: 'Invalid email format' }),
  mobile: z.string().min(10, { message: 'Mobile number should be at least 10 digits' }),
  password: z.string().min(6, { message: 'Password should be at least 6 characters long' }),
});

// Register a new user with Zod validation
exports.registerUser = async (req, res) => {
  try {
    // Validate request body using Zod schema
    const validatedData = userRegistrationSchema.parse(req.body);

    // Hash the password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    // Create the new user in the database
    const newUser = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        mobile: validatedData.mobile,
        password: hashedPassword,
      },
    });

    res.status(201).json(newUser);  // Return the created user data
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Zod validation errors
      return res.status(400).json({ errors: error.errors });
    }
    // Other errors
    res.status(500).json({ error: error.message });
  }
};

// Define Zod schema for validating the user ID (parsing as an integer)
const userIdSchema = z.object({
  id: z.string().regex(/^\d+$/, { message: 'User ID must be a valid integer' }),
});

// Get a user by ID with Zod validation
exports.getUser = async (req, res) => {
  try {
    // Validate the request parameter (ID) using Zod
    const validatedParams = userIdSchema.parse(req.params);

    // Find the user by the unique ID, making sure to parse the ID as an integer
    const user = await prisma.user.findUnique({ 
      where: { id: parseInt(validatedParams.id) }  // Convert the ID to an integer
    });

    // Check if the user exists and return the result
    if (user) {
      res.json(user);  // Return the user if found
    } else {
      res.status(404).json({ error: 'User not found' });  // Return a 404 error if user doesn't exist
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Handle validation errors from Zod
      return res.status(400).json({ errors: error.errors });
    }
    // Handle other errors
    res.status(500).json({ error: error.message });
  }
};
