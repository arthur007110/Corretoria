const mysql = require('mysql');

function getDb() {
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
        query(`CREATE TABLE ${tableName} (${parmsString})`, callback);
        console.log(`CREATE TABLE ${tableName} (${parmsString})`);
    }

    function insertInto(tableName, parms, callback) {
        const namesString = parms.map(param => param.name).join(', ');
        const valuesString = parms.map(param => `'${param.value}'`).join(', ');
        query(`INSERT INTO ${tableName} (${namesString}) VALUES (${valuesString})`, callback);
    }

    function deleteFrom(tableName, params, callback) {
        const whereString = params.map(param => `${param.name} = '${param.value}'`).join(' AND ');
        query(`DELETE FROM ${tableName} WHERE ${whereString}`, callback);
    }

    function update(tableName, parms, conditions, callback) {
        const setString = parms.map(param => `${param.name} = '${param.value}'`).join(', ');
        const whereString = conditions.map(condition => `${condition.name} = '${condition.value}'`).join(' AND ');
        query(`UPDATE ${tableName} SET ${setString} WHERE ${whereString}`, callback);
    }

    function sellectAll(tableName, callback) {
        query(`SELECT * FROM ${tableName}`, callback);
    }

    function sellectAllWhere(tableName, params, callback) {
        const whereString = params.map(param => `${param.name} = '${param.value}'`).join(' AND ');
        query(`SELECT * FROM ${tableName} WHERE ${whereString}`, callback);
    }

    function sellectOne(tableName, params, callback) {
        const whereString = params.map(param => `${param.name} = '${param.value}'`).join(' AND ');
        query(`SELECT * FROM ${tableName} WHERE ${whereString} LIMIT 1`, callback);
    }

    function rightJoin(tableName1, tableName2, params, callback) {
        const whereString = params.map(param => `${param.name} = '${param.value}'`).join(' AND ');
        query(`SELECT * FROM ${tableName1} RIGHT JOIN ${tableName2} ON ${whereString}`, callback);
    }

    return {
        query,
        createDatabase,
        createTable,
        insertInto,
        deleteFrom,
        update,
        sellectAll,
        sellectOne,
        sellectAllWhere,
        rightJoin,
    }
}

module.exports = getDb;