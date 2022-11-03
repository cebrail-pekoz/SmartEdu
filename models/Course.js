// ***** MODÜLLER
const mongoose = require('mongoose'); // mongoDB veri şeması modülü
const Schema = mongoose.Schema; // veri şeması
const slugify = require('slugify'); // slugify modülü
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
    // slug oluşturma
    slug: {
        type: String, // veri tipi
        unique: true, // benzersiz/tek
    },
    category: {
        type: mongoose.Schema.Types.ObjectId, // kurslara kategori ekleme
        ref: 'Category', // referans verme | ilişkilendirme
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, // user ile ilişkilendirme
        ref: 'User', // referans verme | ilişkilendirme
    },
});
// ***** //KURSLAR VERİ ŞEMASI

// ***** KURS İSMİNDEN SLUG OLUŞTURMA MIDDLEWARE
// veritabanına kaydetmeden önce kurs isminden slug oluşturacak
CourseSchema.pre('validate', function (next) {
    this.slug = slugify(this.name, {
        lower: true, // küçük harfe çevir
        strict: true, // özel karakterleri es geç
    });
    next();
});
// ***** KURS İSMİNDEN SLUG OLUŞTURMA MIDDLEWARE

const Course = mongoose.model('Course', CourseSchema); // şemayı modele çevirme

module.exports = Course; // modeli dışa açma
