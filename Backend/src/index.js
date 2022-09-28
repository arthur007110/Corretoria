const express = require('express');
var bodyParser = require('body-parser')
const app = express();
const path = require('path');
app.use(bodyParser.urlencoded({
    extended: true
}));
const router = require('./routes');

app.use('/', router);

app.use('/', express.static(path.join(__dirname, '..', '..', 'Frontend', 'pages')));

app.get('/', (_req, res) => {
    res.redirect('/Main/index.html');
});

app.listen(3000, () => {
    console.log('Server iniciado na porta 3000');
    console.log('Acesse http://localhost:3000');
});
