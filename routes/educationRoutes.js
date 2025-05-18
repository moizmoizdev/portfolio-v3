const express = require('express');
const router = express.Router();
const {
  getEducation,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducation
} = require('../controllers/educationController');

router.route('/')
  .get(getEducation)
  .post(createEducation);

router.route('/:id')
  .get(getEducationById)
  .put(updateEducation)
  .delete(deleteEducation);

module.exports = router; 