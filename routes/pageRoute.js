// ***** MODÜLLER
const express = require('express'); // express modülü
const pageController = require('../controllers/pageController'); // controller
const router = express.Router(); // express Router
const redirectMiddleware = require('../middlewares/registerMiddleware'); //kullanıcı giriş kontrolü dosyası
// ***** //MODÜLLER

// **** YÖNLENDİRMELER
router.route('/').get(pageController.getIndexPage); // anasayfa
router.route('/about').get(pageController.getAboutPage); // about sayfası
router.route('/contact').get(pageController.getContactPage); // contact sayfası
router
    .route('/register')
    .get(redirectMiddleware, pageController.getRegisterPage); // register sayfası
router.route('/login').get(redirectMiddleware, pageController.getLoginPage); // login sayfası
router.route('/contact').post(pageController.sendEmail); // email gönderme
// **** //YÖNLENDİRMELER

module.exports = router; // modülü dışa açma
