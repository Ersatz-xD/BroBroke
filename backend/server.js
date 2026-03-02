const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const transactionRoutes = require('./routes/transactionRoutes');
require('dotenv').config();

const app = express();

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use('/api/transactions', transactionRoutes);

//db conn
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('Db conn failed: ', err));

app.get('/', (req, res) => {
  res.send('BroBroke API is running!');
});

//start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});