const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  lender: { type: String, required: true }, 
  borrower: { type: String, required: true }, 
  amount: { type: Number, required: true },
  purpose: { type: String, default: 'Miscellaneous' },
  status: { type: String, enum: ['pending', 'resolved'], default: 'pending' },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);