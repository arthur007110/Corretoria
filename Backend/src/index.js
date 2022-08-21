const express = require('express');
const app = express();
const mainDb = require('./features/bd/main');
const router = require('./routes')

app.use('/', router);

try{
    const db = mainDb();
}catch(err){
    console.log(err);
}

app.listen(3000, () => {
    console.log('Server iniciado na porta 3000');
});
