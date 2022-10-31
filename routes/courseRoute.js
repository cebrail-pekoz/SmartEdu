// ***** MODÜLLER
const express = require('express'); // express modülü
const courseController = require('../controllers/courseController'); // controller
const router = express.Router(); // express Router
// ***** //MODÜLLER

// **** YÖNLENDİRMELER
router.route('/').post(courseController.createCourse); // http://127.0.0.1:3000/courses | post isteği
router.route('/').get(courseController.getAllCourses); // http://127.0.0.1:3000/courses | get isteği
// **** //YÖNLENDİRMELER

module.exports = router; // modülü dışa açma
