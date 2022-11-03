// -- giriş yapan kullanıcı tekrar kayıt veya giriş sayfasını görmesini önleme

module.exports = (req, res, next) => {
    // kullanıcı varsa
    if (req.session.userID) {
        return res.redirect('/');
    }
    next();
};
