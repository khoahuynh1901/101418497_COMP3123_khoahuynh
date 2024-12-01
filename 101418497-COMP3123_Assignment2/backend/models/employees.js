const mongoose = require('mongoose');

const employees = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: {type: String, required: true},
    position: { type: String, required: true },
    salary: { type: Number, required: true },
    date_of_joining: {type: Date, required: false, default: Date.now},
    department: { type: String, required: true }
}, { timestamps: true }

);

module.exports = mongoose.model('Employee', employees);
