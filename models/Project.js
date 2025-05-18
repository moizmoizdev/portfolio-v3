const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a project title']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  technologies: {
    type: [String],
    required: [true, 'Please add at least one technology']
  },
  imageUrl: {
    type: String
  },
  githubUrl: {
    type: String
  },
  liveUrl: {
    type: String
  },
  featured: {
    type: Boolean,
    default: false
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Project', ProjectSchema); 