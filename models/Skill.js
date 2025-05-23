const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a skill name'],
    unique: true
  },
  proficiency: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
    required: [true, 'Please specify proficiency level']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['Frontend', 'Backend', 'Database', 'DevOps', 'Mobile', 'Other']
  }
});

module.exports = mongoose.model('Skill', SkillSchema); 