const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const { model } = require('mongoose');

//get all transactions
router.get('/', async (req, res) => {
    try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json(transactions);
} catch (err) {
    res.status(500).json({ message: err.message });
}

});

//add new transaction
router.post('/', async (req, res) => {
    const { lender, borrower, amount, purpose } = req.body;
    const newTransaction = new Transaction({ lender, borrower, amount, purpose });
    try {
        const savedTransaction = await newTransaction.save();
        res.status(201).json(savedTransaction);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//mark transaction as resolved
router.put('/:id', async (req, res) => {
    try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(
            req.params.id,
            { status: 'resolved' },
            { new: true }
        );
        res.json(updatedTransaction);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
