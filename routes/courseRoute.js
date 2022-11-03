// ***** MODÜLLER
const express = require('express'); // express modülü
const courseController = require('../controllers/courseController'); // controller
const router = express.Router(); // express Router
const roleMiddleware = require('../middlewares/roleMiddleware'); // kullanıcı rolü dosyası
// ***** //MODÜLLER

// **** YÖNLENDİRMELER
router
    .route('/')
    // öğrenci dışındaki kullanıcılar kurs oluşturabilir
    .post(roleMiddleware(['teacher', 'admin']), courseController.createCourse); // http://127.0.0.1:3000/courses | post isteği

router.route('/').get(courseController.getAllCourses); // http://127.0.0.1:3000/courses | get isteği

router.route('/:slug').get(courseController.getCourse); // http://127.0.0.1:3000/courses/slug | get isteği

router.route('/enroll').post(courseController.enrollCourse); // kurs kaydetme

router.route('/release').post(courseController.releaseCourse); // kurs silme -öğrenci

// kursu oluşturan kullanıcının kursu silmesi
router.route('/:slug').delete(courseController.deleteCourse); // http://127.0.0.1:3000/courses/slug | silme isteği

router.route('/:slug').put(courseController.updateCourse); // kurs güncelleme

// **** //YÖNLENDİRMELER

module.exports = router; // modülü dışa açma
