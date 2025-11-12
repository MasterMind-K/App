const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/save-name', (req, res) => {
    const name = req.body.name;
    fs.appendFile('imiona.txt', name + '\n', (err) => {
        if (err) {
            return res.status(500).send('Błąd zapisu');
        }
        res.send('Zapisano imię: ' + name);
    });
});

app.listen(3001, () => console.log('Serwer działa na porcie 3001'));