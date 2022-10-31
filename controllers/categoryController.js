// ***** MODÜLLER
const Category = require('../models/Category');
// ***** //MODÜLLER

// ***** YENİ KATEGORİ OLUŞTURMA
exports.createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body); // body'den verileri yakalama
        // -- 200 : oluşturma isteği
        res.status(201).json({
            status: 'success', // sayfa cevabı
            category, // sayfaya veriyi gönderme
        });
    } catch (err) {
        // -- 400 : kötü istek
        res.status(400).json({
            status: 'fail', // sayfa cevabı
            err, // yakalanan hata
        });
    }
};
// ***** //YENİ KATEGORİ OLUŞTURMA
