const express = require('express')
const mongoose = require('mongoose');

const app = express()
const PORT=3000;

mongoose.connect('mongodb://localhost/SikAI');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
app.listen(PORT,() =>{
    console.log(`Server started on port ${PORT}`)
})