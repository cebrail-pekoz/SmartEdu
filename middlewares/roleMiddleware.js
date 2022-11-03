// kullanıcı rolü kontrolü

module.exports = (roles) => {
    return (req, res, next) => {
        const userRole = req.body.role; // rolü form alanından alma
        // eğer rol yetki verilen alan/işlem içindeyse
        if (roles.includes(userRole)) {
            next(); // sonraki işlem
        } else {
            return res.status(401).send('İşlem Yapılamıyor');
        }
    };
};
