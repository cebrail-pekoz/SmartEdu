// ***** MODÜLLER
const express = require('express'); // express modülü
const pageController = require('../controllers/pageController'); // controller
const router = express.Router(); // express Router
// ***** //MODÜLLER

// **** YÖNLENDİRMELER
router.route('/').get(pageController.getIndexPage); // anasayfa
router.route('/about').get(pageController.getAboutPage); // about sayfası
// **** //YÖNLENDİRMELER

module.exports = router; // modülü dışa açma
