const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Register controller
async function register(req, res) {
    const { address,telephone, email, role, name, password } = req.body;
  
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
  
    // if user role is company create a company
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Create a new user
    const newUser = new User({
      email,
      role,
      name,
      password: hashedPassword,
      address,
      telephone
    });
  
    // Save the user to the database
    try {
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

// Login controller
async function login(req, res) {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Check if password is correct
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Incorrect password' });
  }

  // Generate JWT token
  const token = jwt.sign({ email: user.email, role: user.role }, 'secretKey');
  const {username, name, _id, role} = user; 

  res.json({ token, user:{username, name, userId:_id, role}});
}

module.exports = { register, login };
