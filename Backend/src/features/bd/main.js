const mysql = require('mysql');

function getDb() {
    console.log('getDb');
    const con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "SenhaDoBancoDeDados1",
        database: "corretoria"
    });
    con.connect((err) => {
        if (err) throw err;
        console.log("Connected!");
    });

    function query(sql, callback) {
        con.query(sql, callback);
    }

    function createDatabase(dbName, callback) {
        query(`CREATE DATABASE ${dbName}`, callback);
    }

    function createTable(tableName, parms, callback) {
        const parmsString = parms.map(p => `${p.name} ${p.type}`).join(', ');
        // console.log(`CREATE TABLE ${tableName} (${parmsString})`);
        query(`CREATE TABLE ${tableName} (${parmsString})`, callback);
    }

    return {
        query,
        createDatabase,
        createTable
    }
}

module.exports = getDb;