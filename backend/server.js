const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config();
const app = express()
app.use(express.json());

const PORT=3000;

const connectionString = process.env.MONGOCONNECTION;

mongoose.connect(connectionString);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const userRoutes = require("./Routes/UserRoutes");
const assignmentRoutes = require("./Routes/AssignmentRoutes")


app.use("/auth", userRoutes);
app.use("/assignment", assignmentRoutes)

app.listen(PORT,() =>{
    console.log(`Server started on port ${PORT}`)
})