const express = require('express');
var bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
const router = require('./routes');

app.use('/', router);

app.listen(3000, () => {
    console.log('Server iniciado na porta 3000');
});
