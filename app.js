const express = require('express');

const PORT = 3000;
const LOCAL = '127.0.0.1';
const app = express();

app.get('/', (req, res) => {
    res.status(200).send('Index Sayfası');
});

app.listen(PORT, () => {
    console.log(`Server Çalışıyor : http://${LOCAL}:${PORT}`);
});
