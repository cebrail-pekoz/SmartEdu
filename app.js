// ***** MODÜLLER
const express = require('express'); // node.js uygulama çatısı
const ejs = require('ejs'); // template engine
// ***** //MODÜLLER

// ***** UYGULAMA DEĞİŞKENLERİ
const PORT = 3000; // çalışılacak port
const LOCAL = '127.0.0.1'; // localhost
const app = express(); // express uygulaması instance
// ***** //UYGULAMA DEĞİŞKENLERİ

// ***** TEMPLATE ENGINE
app.set('view engine', 'ejs'); // template engine ekleme
app.use(express.static('public')); // statik dosyaların yolu  -middleware
// ***** //TEMPLATE ENGINE

// ***** YÖNLENDİRMELER
// anasayfa isteği
app.get('/', (req, res) => {
    res.status(200).render('index', {
        page_name: 'index',
    });
});

// about sayfası
app.get('/about', (req, res) => {
    res.status(200).render('about', {
        page_name: 'about',
    });
});
// ***** //YÖNLENDİRMELER

// ***** SERVER
// local server çalıştırma
app.listen(PORT, () => {
    console.log(`Server Çalışıyor : http://${LOCAL}:${PORT}`);
});
// ***** //SERVER
