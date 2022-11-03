// ***** MODÜLLER
const express = require('express'); // express modülü
const categoryController = require('../controllers/categoryController'); // controller
const router = express.Router(); // express Router
// ***** //MODÜLLER

// **** YÖNLENDİRMELER
router.route('/').post(categoryController.createCategory); // http://127.0.0.1:3000/categories | post isteği
router.route('/:id').delete(categoryController.deleteCategory); // kategori silme

// **** //YÖNLENDİRMELER

module.exports = router; // modülü dışa açma
