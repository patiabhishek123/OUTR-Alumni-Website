require("dotenv").config();
const mongoose = require('mongoose');
const ValidRegistration = require('../models/validRegd.js'); 

// Connect to your MongoDB database
mongoose.connect(process.env.MONGO_URI);

// Function to insert registration numbers
async function insertRegistrationNumbers() {
    try {
        const start = 23110250;
        const end = 23110327;
        const registrationNumbers = [];

        for (let i = start; i <= end; i++) {
            registrationNumbers.push({ registrationNumber: i.toString() });
        }

        await ValidRegistration.insertMany(registrationNumbers);
        console.log("Registration numbers inserted successfully");
        mongoose.connection.close();  // Close connection when done
    } catch (err) {
        console.error(err);
        mongoose.connection.close();
    }
}

// Run the function to insert the numbers
insertRegistrationNumbers();