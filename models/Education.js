const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema({
  degree: {
    type: String,
    required: [true, 'Please add a degree']
  },
  school: {
    type: String,
    required: [true, 'Please add a school name']
  },
  years: {
    type: String,
    required: [true, 'Please add years of study']
  },
  location: {
    type: String,
    required: [true, 'Please add a location']
  },
  about: {
    type: String,
    required: [true, 'Please add information about your education']
  },
  highlights: {
    type: [String]
  }
});

module.exports = mongoose.model('Education', EducationSchema); 