// ***** MODÜLLER
const express = require('express'); // express modülü
const router = express.Router(); // express Router
const { body } = require('express-validator'); // kontrol modülü
const authController = require('../controllers/authController'); // controller
const authMiddleware = require('../middlewares/authMiddleware'); // kullanıcı kontrolü dosyası
// ***** //MODÜLLER

// **** YÖNLENDİRMELER
// -- bu adresin kayıt formundaki action ile aynı olması gerekir.
// http://127.0.0.1:3000/users/signup | post isteği
router.route('/signup').post(
    [
        body('name').not().isEmpty().withMessage('İsim alanı zorunlu'), // isim kontrolü

        // mail kontrolü
        body('email')
            .isEmail()
            .withMessage('Email alanı zorunlu')
            .custom((userEmail) => {
                return User.findOne({ email: userEmail }).then((user) => {
                    if (user) {
                        return Promise.reject('Email adresi zaten var');
                    }
                });
            }),

        body('password').not().isEmpty().withMessage('Şifre alanı zorunlu'), // şifre kontrolü
    ],

    authController.createUser
);

// -- bu adresin giriş formundaki action ile aynı olması gerekir.

router.route('/login').post(authController.loginUser); // http://127.0.0.1:3000/users/login | post isteği

router.route('/logout').get(authController.logoutUser); // http://127.0.0.1:3000/users/logout | get isteği

// -- dashboard sayfasına istek geldiğinde 'authMiddleware' ile kullanıcının giriş yapıp yapmadığı kontrol edilir.
router.route('/dashboard').get(authMiddleware, authController.getDashboardPage); // http://127.0.0.1:3000/users/dashboard | get isteği

router.route('/:id').delete(authController.deleteUser2); // kullanıcı silme
// **** //YÖNLENDİRMELER

module.exports = router; // modülü dışa açma
