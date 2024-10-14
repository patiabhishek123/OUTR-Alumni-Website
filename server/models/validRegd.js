const mongoose = require('mongoose');

// Schema for valid registration numbers
const validRegistrationSchema = new mongoose.Schema({
    registrationNumber: String
});

const ValidRegd = mongoose.model('ValidRegd', validRegistrationSchema);

module.exports = ValidRegd;