// ***** MODÜLLER
const Course = require('../models/Course'); // kurs veri modeli dosyası
const Category = require('../models/Category'); // category veri modeli dosyası
const User = require('../models/User'); // kullanıcı veri modeli dosyası
// ***** //MODÜLLER

// ***** YENİ KURS OLUŞTURMA
exports.createCourse = async (req, res) => {
    try {
        const course = await Course.create({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            user: req.session.userID, // kursu oluşturan kullanıcı bilgisi
        });
        req.flash('success', `${course.name} kursu oluşturuldu`); // bildirim mesajı gönderme
        // -- 201 : oluşturma isteği
        res.status(201).redirect('courses');
    } catch (err) {
        req.flash('error', 'Kurs oluşturulurken hata oluştu!'); // bildirim mesajı gönderme
        // -- 400 : kötü istek
        res.status(400).redirect('courses');
    }
};
// ***** //YENİ KURS OLUŞTURMA

// ***** TÜM KURSLARI ALMA VE SIRALAMA
exports.getAllCourses = async (req, res) => {
    try {
        const query = req.query.search; // arama için wuery bilgisini alma

        // -- kategoriye tıklandığında kategoriyle ilişkili kursları getirme
        const categorySlug = req.query.categories; // query parametresi yardımıyla kategoriyi alma
        const category = await Category.findOne({ slug: categorySlug }); // veritabanından ilgili kategoriyi bulma

        let filter = {}; // filtreleme için boş obje oluşturma

        // eğer kategori query varsa
        if (categorySlug) {
            filter = { category: category._id }; // filtrele
        }

        if (query) {
            filter = { name: query }; // yazılan değere göre filtreleme
        }

        if (!query && !categorySlug) {
            (filter.name = ''), (filter.category = null);
        }

        // veritabanından kursları getirme  | query parametresi varsa filtreye göre getir
        const courses = await Course.find({
            // --  $options : "i" == büyük/küçük harfe bakmadan filtrele
            $or: [
                { name: { $regex: '.*' + filter.name + '.*', $options: 'i' } },
                { category: filter.category },
            ],
        })
            .sort('-createAt')
            .populate('user');
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
        const categories = await Category.find(); // veritabanından kategorileri getirme
        const user = await User.findById(req.session.userID); // kullanıcı bilgisi
        // -- slug yardımıyla veritabanından kursu alma
        // -- populate ile ilişki kurulan veri alınır
        const course = await Course.findOne({ slug: req.params.slug }).populate(
            'user'
        );
        // -- 200 : başarılı istek
        res.status(200).render('course', {
            course, // sayfaya bulunan kursları gönderme
            page_name: 'course', // sayfa ismi
            user, // kullanıcı bilgisi gönderme
            categories, // kategori bilgisi gönderme
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

// ***** KURSA KAYDOLMA
exports.enrollCourse = async (req, res) => {
    try {
        const user = await User.findById(req.session.userID); // kaydolmak isteyen kullanıcı

        await user.courses.push({ _id: req.body.course_id }); // kaydolacak kurs bilgisini alıp ekleme
        await user.save(); // kursu kaydetme

        // -- 200 : başarılı istek
        res.status(200).redirect('/users/dashboard');
    } catch (err) {
        // -- 400 : kötü istek
        res.status(400).json({
            status: 'fail', // sayfa cevabı
            err, // yakalanan hata
        });
    }
};
// ***** //KURSA KAYDOLMA

// ***** ÖĞRENCİ KURS SİLME
exports.releaseCourse = async (req, res) => {
    try {
        const user = await User.findById(req.session.userID); // kurs sahibi kullanıcı

        await user.courses.pull({ _id: req.body.course_id }); // silinecek kurs bilgisi
        await user.save(); // silme işlemi kaydetme

        // -- 200 : başarılı istek
        res.status(200).redirect('/users/dashboard');
    } catch (err) {
        // -- 400 : kötü istek
        res.status(400).json({
            status: 'fail', // sayfa cevabı
            err, // yakalanan hata
        });
    }
};
// ***** //ÖĞRENCİ KURS SİLME

// ***** ÖĞRETMEN KURS SİLME
exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findOneAndRemove({ slug: req.params.slug }); // ilgili kursu bulup silme

        req.flash('error', `${course.name} kursu silindi`); // bildirim mesajı gönderme

        res.status(200).redirect('/users/dashboard');
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};
// ***** ÖĞRETMEN KURS SİLME

// ***** ÖĞRETMEN KURS GÜNCELLEME
exports.updateCourse = async (req, res) => {
    try {
        const course = await Course.findOne({ slug: req.params.slug });
        course.name = req.body.name;
        course.description = req.body.description;
        course.category = req.body.category;

        course.save();

        res.status(200).redirect('/users/dashboard');
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};
// ***** ÖĞRETMEN KURS GÜNCELLEME
