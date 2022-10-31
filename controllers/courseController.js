// ***** MODÜLLER
const Course = require('../models/Course'); // kurs veri modeli dosyası
const Category = require('../models/Category'); // category veri modeli dosyası
// ***** //MODÜLLER

// ***** YENİ KURS OLUŞTURMA
exports.createCourse = async (req, res) => {
    try {
        const course = await Course.create(req.body); // body'den verileri yakalama
        // -- 201 : oluşturma isteği
        res.status(201).json({
            status: 'success', // sayfa cevabı
            course, // sayfaya veriyi gönderme
        });
    } catch (err) {
        // -- 400 : kötü istek
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
        // -- kategoriye tıklandığında kategoriyle ilişkili kursları getirme
        const categorySlug = req.query.categories; // query parametresi yardımıyla kategoriyi alma
        const category = await Category.findOne({ slug: categorySlug }); // veritabanından ilgili kategoriyi bulma

        let filter = {}; // filtreleme için boş obje oluşturma

        // eğer kategori query varsa
        if (categorySlug) {
            filter = { category: category._id }; // filtrele
        }

        const courses = await Course.find(filter); // veritabanından kursları getirme  | query parametresi varsa filtreye göre getir
        const categories = await Category.find(); // veritabanından kategorileri getirme

        // -- 200 : başarılı istek
        res.status(200).render('courses', {
            categories, // sayfaya bulunan kategorileri gönderme
            courses, // sayfaya bulunan kursları gönderme
            page_name: 'courses', // sayfa ismi
        });
    } catch (err) {
        // -- 400 : kötü istek
        res.status(400).json({
            status: 'fail', // sayfa cevabı
            err, // yakalanan hata
        });
    }
};
// ***** //TÜM KURSLARI ALMA VE SIRALAMA

// ***** TEKİL KURS SAYFASI
exports.getCourse = async (req, res) => {
    try {
        const course = await Course.findOne({ slug: req.params.slug }); // slug yardımıyla veritabanından kursu alma
        // -- 200 : başarılı istek
        res.status(200).render('course', {
            course, // sayfaya bulunan kursları gönderme
            page_name: 'course', // sayfa ismi
        });
    } catch (err) {
        // -- 400 : kötü istek
        res.status(400).json({
            status: 'fail', // sayfa cevabı
            err, // yakalanan hata
        });
    }
};
// ***** //TEKİL KURS SAYFASI
