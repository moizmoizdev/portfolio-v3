const Experience = require('../models/Experience');

// @desc    Get all experience records
// @route   GET /api/experience
// @access  Public
exports.getExperience = async (req, res) => {
  try {
    const experience = await Experience.find().sort('-startDate');
    
    res.status(200).json({
      success: true,
      count: experience.length,
      data: experience
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get single experience record
// @route   GET /api/experience/:id
// @access  Public
exports.getExperienceById = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    
    if (!experience) {
      return res.status(404).json({
        success: false,
        error: 'Experience record not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: experience
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Create experience record
// @route   POST /api/experience
// @access  Public
exports.createExperience = async (req, res) => {
  try {
    const experience = await Experience.create(req.body);
    
    res.status(201).json({
      success: true,
      data: experience
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      
      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
};

// @desc    Update experience record
// @route   PUT /api/experience/:id
// @access  Public
exports.updateExperience = async (req, res) => {
  try {
    let experience = await Experience.findById(req.params.id);
    
    if (!experience) {
      return res.status(404).json({
        success: false,
        error: 'Experience record not found'
      });
    }
    
    experience = await Experience.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      data: experience
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      
      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
};

// @desc    Delete experience record
// @route   DELETE /api/experience/:id
// @access  Public
exports.deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    
    if (!experience) {
      return res.status(404).json({
        success: false,
        error: 'Experience record not found'
      });
    }
    
    await Experience.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}; 