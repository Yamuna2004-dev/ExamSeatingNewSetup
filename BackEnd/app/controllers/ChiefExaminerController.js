const ChiefExaminer = require('../models/Cheifexaminer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//  Get all chief examiners
exports.getAll = async (req, res) => {
  try {
    const examiners = await ChiefExaminer.findAll();
    res.json(examiners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Get chief examiner by email
exports.getByEmail = async (req, res) => {
  try {
    const examiner = await ChiefExaminer.findOne({
      where: { email: req.params.email }
    });
    if (!examiner) return res.status(404).json({ message: 'Examiner not found' });
    res.json(examiner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Register a new chief examiner
exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if email already exists
    const existingExaminer = await ChiefExaminer.findOne({ where: { email } });
    if (existingExaminer) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the chief examiner
    const newExaminer = await ChiefExaminer.create({
      email,
      password: hashedPassword
    });

    res.status(201).json(newExaminer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Login chief examiner
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the examiner by email
    const examiner = await ChiefExaminer.findOne({ where: { email } });
    if (!examiner) return res.status(404).json({ message: 'Examiner not found' });

    // Compare password with hashed password
    const isValidPassword = await bcrypt.compare(password, examiner.password);
    if (!isValidPassword) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT token for authentication
    const token = jwt.sign({ id: examiner.id, email: examiner.email }, 'your_secret_key', { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Update chief examiner information
exports.update = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const [updated] = await ChiefExaminer.update(
      { email, password: await bcrypt.hash(password, 10) },
      { where: { id: req.params.id } }
    );
    
    if (!updated) return res.status(404).json({ message: 'Examiner not found' });
    res.json({ message: 'Examiner updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a chief examiner
exports.delete = async (req, res) => {
  try {
    const deleted = await ChiefExaminer.destroy({
      where: { id: req.params.id }
    });
    
    if (!deleted) return res.status(404).json({ message: 'Examiner not found' });
    res.json({ message: 'Examiner deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
