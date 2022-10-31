// ***** MODÜLLER
const Course = require('../models/Course');
// ***** //MODÜLLER

// ***** YENİ KURS OLUŞTURMA
exports.createCourse = async (req, res) => {
    try {
        const course = await Course.create(req.body); // body'den verileri yakalama
        // 200 : oluşturma isteği
        res.status(201).json({
            status: 'success', // sayfa cevabı
            course, // sayfaya veriyi gönderme
        });
    } catch (err) {
        // 400 : kötü istek
        res.status(400).json({
            status: 'fail', // sayfa cevabı
            err, // yakalanan hata
        });
    }
};
// ***** //YENİ KURS OLUŞTURMA

// ***** TÜM KURSLARI ALMA VE SIRALAMA
exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find(); // veritabanından kursları alma
        // 200 : başarılı istek
        res.status(200).render('courses', {
            courses, // sayfaya bulunan kursları gönderme
            page_name: 'courses', // sayfa ismi
        });
    } catch (err) {
        // 400 : kötü istek
        res.status(400).json({
            status: 'fail', // sayfa cevabı
            err, // yakalanan hata
        });
    }
};
// ***** //TÜM KURSLARI ALMA VE SIRALAMA
