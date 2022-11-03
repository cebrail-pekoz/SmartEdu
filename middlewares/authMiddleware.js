// -- dashboard sayfasına ulaşmak için kullanıcının giriş yapması gerekir

const User = require('../models/User'); // kullanıcı veri modeli

module.exports = (req, res, next) => {
    // gelen session yardımıyla veritabanından kullanıcıyı bulma
    User.findById(req.session.userID, (err, user) => {
        if (err || !user) {
            return res.redirect('/login'); // hata veya kullanıcı yoksa
        }
        next(); // sonraki işleme devam et
    });
};
