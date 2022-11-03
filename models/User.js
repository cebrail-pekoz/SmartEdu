// ***** MODÜLLER
const mongoose = require('mongoose'); // mongoDB veri şeması modülü
const bcrypt = require('bcrypt'); // şifreleme
const Schema = mongoose.Schema; // veri şeması
// ***** //MODÜLLER

// ***** KULLANICI VERİ ŞEMASI
const UserSchema = new Schema({
    // field
    name: {
        type: String, // veri tipi
        required: true, // zorunluluk
    },
    // field
    email: {
        type: String, // veri tipi
        required: true, // zorunluluk
        unique: true, // benzersiz/tek
    },
    // field
    password: {
        type: String, // veri tipi
        required: true, // zorunluluk
    },
    // field  -kullanıcı rolü
    role: {
        type: String,
        enum: ['student', 'teacher', 'admin'],
        default: 'student',
    },
    // öğrencilerin alacağı kurslar
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
        },
    ],
});
// ***** //KULLANICI VERİ ŞEMASI

// ***** KULLANICI PAROLASI ŞİFRELEME
// kullanıcı veritabanına kaydedilmeden önce girdiği parola şifrelenip o şekilde kaydedilecek
UserSchema.pre('save', function (next) {
    const user = this; // kullanıcı
    // tekrardan şifrelemeyi engelleme
    if (!user.isModified('password')) return next();
    // parolayı hash olarak kaydetme
    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash; // kullanıcı parolasını hash değerine eşitleme
            next(); // sonraki işlemden devam etme
        });
    });
});
// ***** //KULLANICI PAROLASI ŞİFRELEME

const User = mongoose.model('User', UserSchema); // şemayı modele çevirme

module.exports = User; // modeli dışa açma
