// ***** MODÜLLER
const bcrypt = require('bcrypt'); // şifreleme
const { validationResult } = require('express-validator'); // veri kontrolü modülü
const User = require('../models/User'); // kullanıcı şeması dosyası
const Category = require('../models/Category'); // kategori şema dosyası
const Course = require('../models/Course'); // kurs veri şeması dosyası
// ***** //MODÜLLER

// ***** YENİ KULLANICI OLUŞTURMA
exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body); // body'den verileri yakalama
        // -- 200 : oluşturma isteği
        res.status(201).redirect('/login');
    } catch (err) {
        // veri kontrolü
        const errors = validationResult(req);
        console.log(errors);
        console.log(errors.array()[0].msg);
        // hata mesajlarını alma
        for (let i = 0; i < errors.array().length; i++) {
            req.flash('error', `${errors.array()[i].msg}`);
        }
        res.status(400).redirect('/register'); // yönlendirme
    }
};
// ***** //YENİ KULLANICI OLUŞTURMA

// ***** KULLANICI GİRİŞİ
// exports.loginUser = async (req, res) => {
//     const body = req.body; // body verileri alma
//     const user = await User.findOne({ email: body.email }); // email karşılaştırma
//     if (user) {
//         // şifre kontrolü
//         const validPassword = await bcrypt.compare(
//             body.password,
//             user.password
//         );
//         if (validPassword) {
//             // kullanıcı oturumu -session
//             req.session.userID = user._id;
//             res.status(200).redirect('/users/dashboard'); // giriş başarılı ve dashboard sayfasına yönlendirme
//         } else {
//             res.status(400).redirect('/login?error=invalid_password'); // hatalı şifre
//         }
//     } else {
//         res.status(401).redirect('/login?error=user_not_found'); // kullanıcı bulunamadı
//     }
// };
// ***** //KULLANICI GİRİŞİ

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        //mongoose 6
        const user = await User.findOne({ email });
        if (user) {
            bcrypt.compare(password, user.password, (err, same) => {
                if (same) {
                    // USER SESSION
                    req.session.userID = user._id;
                    res.status(200).redirect('/users/dashboard');
                } else {
                    req.flash('error', 'Your password is not correct!');
                    res.status(400).redirect('/login');
                }
            });
        } else {
            req.flash('error', 'User is not exist!');
            res.status(400).redirect('/login');
        }
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// ***** OTURUM KAPATMA İŞLEMİ
exports.logoutUser = (req, res) => {
    // session bilgisini silme
    req.session.destroy(() => {
        res.redirect('/');
    });
};
// ***** //OTURUM KAPATMA İŞLEMİ

// ***** DASHBOARD SAYFASI
exports.getDashboardPage = async (req, res) => {
    // giriş yapan kullanıcı bilgisi ve kaydolduğu kurslar
    const user = await User.findOne({ _id: req.session.userID }).populate(
        'courses'
    );
    const categories = await Category.find(); // kategori verileri
    const courses = await Course.find({ user: req.session.userID }); // kursu oluşturan kullanıcı
    const users = await User.find(); // tüm kullanıcılar
    res.status(200).render('dashboard', {
        page_name: 'dashboard', // sayfa ismi
        user, // kullanıcı verisi gönderme
        categories, // kategori verisi gönderme
        courses, // kursların verisini gönderme
        users,
    });
};
// ***** //DASHBOARD SAYFASI

// ***** ADMİN YETKİSİYLE KULLANICI SİLME
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndRemove(req.params.id);
        await Course.deleteMany({ user: req.params.id });

        res.status(200).redirect('/users/dashboard');
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};
// ***** //ADMİN YETKİSİYLE KULLANICI SİLME

// !!!!!!!!
exports.deleteUser2 = async (req, res) => {
    try {
        console.log('params : ', req.params.id);
        await User.findOneAndRemove({ _id: req.params.id });
        // Eğer silinen kullanıcı öğretmense oluşturduğu kursları silme
        const courses = await Course.find({ user: req.params.id });
        courses.forEach(async (course) => {
            const users = await User.find();
            users.forEach((user) => {
                if (user.courses.includes(course)) {
                    user.courses.pull(course);
                    user.save();
                }
            });
        });
        await Course.deleteMany({ user: req.params.id });
        await User.updateMany({});
        req.flash('success', 'User was deleted successfully');
        res.status(200).redirect('/users/dashboard');
    } catch (error) {
        console.log(error);
        req.flash('error', `${error}`);
        res.redirect('/users/dashboard');
    }
};
// !!!!!!!!
