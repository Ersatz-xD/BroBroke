const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const protect = require('../middleware/authMiddleware'); 

router.use(protect);

//Fetch user transactions
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.userId }).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//new transaction
router.post('/', async (req, res) => {
  const { friendName, type, amount, purpose } = req.body;

  try {
    const newTransaction = new Transaction({
      user: req.user.userId, 
      friendName,
      type,
      amount,
      purpose
    });

    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//transaction resolved/
router.put('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findOne({ _id: req.params.id, user: req.user.userId });
    
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found or unauthorized' });
    }

    // Update the status and save
    transaction.status = 'resolved';
    const updatedTransaction = await transaction.save();
    
    res.json(updatedTransaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;