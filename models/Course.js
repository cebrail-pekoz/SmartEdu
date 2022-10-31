// ***** MODÜLLER
const mongoose = require('mongoose'); // mongoDB veri şeması modülü
const Schema = mongoose.Schema; // veri şeması
// ***** //MODÜLLER

// ***** KURSLAR VERİ ŞEMASI
const CourseSchema = new Schema({
    // field
    name: {
        type: String, // veri tipi
        unique: true, // benzersiz/tek
        required: true, // zorunluluk
    },
    // field
    description: {
        type: String, // veri tipi
        required: true, // zorunluluk
        trim: true, // içeriğin boşluklarını alma
    },
    // field
    createdAt: {
        type: Date, // veri tipi
        default: Date.now, // varsayılan değer
    },
});
// ***** //KURSLAR VERİ ŞEMASI

const Course = mongoose.model('Course', CourseSchema); // şemayı modele çevirme

module.exports = Course; // modeli dışa açma
