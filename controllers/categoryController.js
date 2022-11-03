// ***** MODÜLLER
const Category = require('../models/Category');
// ***** //MODÜLLER

// ***** YENİ KATEGORİ OLUŞTURMA
exports.createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body); // body'den verileri yakalama
        // -- 201 : oluşturma isteği
        res.status(201).redirect('/users/dashboard');
    } catch (err) {
        // -- 400 : kötü istek
        res.status(400).json({
            status: 'fail', // sayfa cevabı
            err, // yakalanan hata
        });
    }
};
// ***** //YENİ KATEGORİ OLUŞTURMA

// ***** KATEGORİ SİLME
exports.deleteCategory = async (req, res) => {
    try {
        await Category.findByIdAndRemove(req.params.id);
        res.status(200).redirect('/users/dashboard');
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};
// ***** //KATEGORİ SİLME
