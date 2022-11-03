const nodemailer = require('nodemailer'); // mail modülü

// anasayfa
exports.getIndexPage = (req, res) => {
    console.log(req.session.userID); // anasyfaya gelindiğinde oturum açan kullanıcı id değeri
    res.status(200).render('index', {
        page_name: 'index', // sayfa ismi
    });
};

// about sayfası
exports.getAboutPage = (req, res) => {
    res.status(200).render('about', {
        page_name: 'about', // sayfa ismi
    });
};

// contact sayfası
exports.getContactPage = (req, res) => {
    res.status(200).render('contact', {
        page_name: 'contact', // sayfa ismi
    });
};

// kayıt sayfası
exports.getRegisterPage = (req, res) => {
    res.status(200).render('register', {
        page_name: 'register', // sayfa ismi
    });
};

// giriş sayfası
exports.getLoginPage = (req, res) => {
    res.status(200).render('login', {
        page_name: 'login', // sayfa ismi
    });
};

// email
exports.sendEmail = async (req, res) => {
    try {
        // console.log(req.body);
        const outputMessage = `
    <h1>Message Details</h1>
    <ul>
        <li>Name : ${req.body.name} </li>
        <li>Email : ${req.body.email} </li>
    </ul>
    <h1>Message</h1>
    <p>${req.body.message}</p>
    `;

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: 'nodejstest26@gmail.com', // gmail account
                pass: 'mxnlrbzmouixyaew', // gmail password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Smart Edu Contact Form" <nodejstest26@gmail.com>', // sender address
            to: 'nodejstest26@gmail.com', // list of receivers
            subject: 'Smart Edu : Hello ✔', // Subject line
            html: outputMessage, // html body
        });

        console.log('Message sent: %s', info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

        req.flash('success', 'Mesajınız iletilmiştir.'); // bildirim mesajı gönderme
        res.status(200).redirect('contact'); // sayfa isteği
    } catch (err) {
        req.flash('error', `Mesajınız Gönderilemedi || HATA : ${err}`); // hata bildirim mesajı gönderme
        res.status(400).redirect('contact'); // sayfa isteği
    }
};
