// ***** MODÜLLER
const mongoose = require('mongoose'); // mongoDB veri şeması modülü
const Schema = mongoose.Schema; // veri şeması
const slugify = require('slugify'); // slugify modülü
// ***** //MODÜLLER

// ***** KATEGORİ VERİ ŞEMASI
const CategorySchema = new Schema({
    // field
    name: {
        type: String, // veri tipi
        unique: true, // benzersiz/tek
        required: true, // zorunluluk
    },
    // slug oluşturma
    slug: {
        type: String, // veri tipi
        unique: true, // benzersiz/tek
    },
});
// ***** //KATEGORİ VERİ ŞEMASI

// ***** KATEGORİ İSMİNDEN SLUG OLUŞTURMA MIDDLEWARE
// veritabanına kaydetmeden önce kurs isminden slug oluşturacak
CategorySchema.pre('validate', function (next) {
    this.slug = slugify(this.name, {
        lower: true, // küçük harfe çevir
        strict: true, // özel karakterleri es geç
    });
    next();
});
// ***** KATEGORİ İSMİNDEN SLUG OLUŞTURMA MIDDLEWARE

const Category = mongoose.model('Category', CategorySchema); // şemayı modele çevirme

module.exports = Category; // modeli dışa açma
