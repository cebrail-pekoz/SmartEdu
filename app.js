// ***** MODÜLLER
const express = require('express'); // node.js uygulama çatısı modülü
const mongoose = require('mongoose'); // mongoDB veri şeması modülü

const pageRouter = require('./routes/pageRoute'); // sayfalar yönlendirme dosyası
const courseRouter = require('./routes/courseRoute'); // kurs yönlendirme dosyası
const categoryRouter = require('./routes/categoryRoute'); // kategori yönlendirme dosyası
// ***** //MODÜLLER

// ***** UYGULAMA DEĞİŞKENLERİ
const PORT = 3000; // çalışılacak port
const LOCAL = '127.0.0.1'; // localhost
const app = express(); // express uygulaması instance
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
// ***** //MIDDLEWARES

// ***** YÖNLENDİRMELER
app.use('/', pageRouter); // http://127.0.0.1:3000/
app.use('/courses', courseRouter); // http://127.0.0.1:3000/courses/
app.use('/categories', categoryRouter); // http://127.0.0.1:3000/categories/
// ***** //YÖNLENDİRMELER

// ***** SERVER
// local server çalıştırma
app.listen(PORT, () => {
    console.log(`Server Çalışıyor : http://${LOCAL}:${PORT}`);
});
// ***** //SERVER
