const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, 'Please add a company name']
  },
  position: {
    type: String,
    required: [true, 'Please add a position']
  },
  location: {
    type: String
  },
  description: {
    type: String,
    required: [true, 'Please add a job description']
  },
  startDate: {
    type: Date,
    required: [true, 'Please add a start date']
  },
  endDate: {
    type: Date
  },
  current: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Experience', ExperienceSchema); 