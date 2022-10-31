// ***** MODÜLLER
const express = require('express'); // node.js uygulama çatısı modülü
const mongoose = require('mongoose'); // mongoDB veri şeması modülü

const pageRouter = require('./routes/pageRoute'); // sayfalar yönlendirme dosyası
const courseRouter = require('./routes/courseRoute'); // kurs yönlendirme dosyası
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
    .then(() => {
        console.log('VERİTABANINA BAĞLANDI ...');
    })
    .catch((err) => {
        console.log(`!! VERİTABANI BAĞLANTI HATASI !! >>> ${err}`);
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
// ***** //YÖNLENDİRMELER

// ***** SERVER
// local server çalıştırma
app.listen(PORT, () => {
    console.log(`Server Çalışıyor : http://${LOCAL}:${PORT}`);
});
// ***** //SERVER
