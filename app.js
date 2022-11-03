// ***** MODÜLLER
const express = require('express'); // node.js uygulama çatısı modülü
const mongoose = require('mongoose'); // mongoDB veri şeması modülü
const session = require('express-session'); // express oturum işlemleri modülü
const MongoStore = require('connect-mongo'); // mongodb oturum modülü
const flash = require('connect-flash'); // bildirim  modülü
const methodOverride = require('method-override');

const pageRouter = require('./routes/pageRoute'); // sayfalar yönlendirme dosyası
const courseRouter = require('./routes/courseRoute'); // kurs yönlendirme dosyası
const categoryRouter = require('./routes/categoryRoute'); // kategori yönlendirme dosyası
const userRouter = require('./routes/userRoute'); // kullanıcı yönlendirme dosyası
// ***** //MODÜLLER

// ***** UYGULAMA DEĞİŞKENLERİ
const PORT = 3000; // çalışılacak port
const LOCAL = '127.0.0.1'; // localhost
const app = express(); // express uygulaması instance
global.userIN = null; // oturum açan kullanıcı için global değişken
// ***** //UYGULAMA DEĞİŞKENLERİ

// ***** VERİTABANI BAĞLANTISI
mongoose
    .connect('mongodb://localhost/smartedu-db', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    // promise
    .then(() => {
        console.log('VERİTABANINA BAĞLANDI ...'); // başarılı bağlantı
    })
    .catch((err) => {
        console.log(`!! VERİTABANI BAĞLANTI HATASI !! >>> ${err}`); // bağlantı hatası
    });
// ***** //VERİTABANI BAĞLANTISI

app.set('view engine', 'ejs'); // template engine ekleme

// ***** MIDDLEWARES
app.use(express.static('public')); // statik dosyaların yolu
app.use(express.urlencoded({ extended: true })); // body verilerini alma
app.use(express.json()); // body verilerini json formatına çevirme
app.use(
    session({
        secret: 'my_keayboard_cat',
        resave: false, // degişiklik olmasada kaydetmek
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: 'mongodb://localhost/smartedu-db', // session veritabanına kaydetme
        }),
    })
);
app.use(flash()); // bildirim paketini uygulamaya ekleme
app.use((req, res, next) => {
    // oluşturulan mesajlar için değişken
    res.locals.flashMessages = req.flash();
    next(); // sonraki işlem
});
app.use(
    methodOverride('_method', {
        methods: ['POST', 'GET'],
    })
);
// ***** //MIDDLEWARES

// ***** SESSION ID DEĞERİNİ ALMA
app.use('*', (req, res, next) => {
    // -- id yerine mail ==> User.findOne({email:req.session.userID})
    userIN = req.session.userID; // oturum açan kullanıcı id değerini değişkene atama
    next(); // bir sonraki işleme devam etme
});
// ***** //SESSION ID DEĞERİNİ ALMA

// ***** YÖNLENDİRMELER
app.use('/', pageRouter); // http://127.0.0.1:3000/
app.use('/courses', courseRouter); // http://127.0.0.1:3000/courses/
app.use('/categories', categoryRouter); // http://127.0.0.1:3000/categories/
app.use('/users', userRouter); // http://127.0.0.1:3000/users/
// ***** //YÖNLENDİRMELER

// ***** SERVER
app.listen(PORT, () => {
    console.log(`Server Çalışıyor : http://${LOCAL}:${PORT}`); // local server çalıştırma
});
// ***** //SERVER
