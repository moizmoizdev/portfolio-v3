const Education = require('../models/Education');

// @desc    Get all education records
// @route   GET /api/education
// @access  Public
exports.getEducation = async (req, res) => {
  try {
    const education = await Education.find().sort('-years');
    
    res.status(200).json({
      success: true,
      count: education.length,
      data: education
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get single education record
// @route   GET /api/education/:id
// @access  Public
exports.getEducationById = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);
    
    if (!education) {
      return res.status(404).json({
        success: false,
        error: 'Education record not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: education
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Create education record
// @route   POST /api/education
// @access  Public
exports.createEducation = async (req, res) => {
  try {
    const education = await Education.create(req.body);
    
    res.status(201).json({
      success: true,
      data: education
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

// @desc    Update education record
// @route   PUT /api/education/:id
// @access  Public
exports.updateEducation = async (req, res) => {
  try {
    let education = await Education.findById(req.params.id);
    
    if (!education) {
      return res.status(404).json({
        success: false,
        error: 'Education record not found'
      });
    }
    
    education = await Education.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      data: education
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

// @desc    Delete education record
// @route   DELETE /api/education/:id
// @access  Public
exports.deleteEducation = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);
    
    if (!education) {
      return res.status(404).json({
        success: false,
        error: 'Education record not found'
      });
    }
    
    await Education.findByIdAndDelete(req.params.id);
    
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