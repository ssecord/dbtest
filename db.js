const mysql = require('mysql');

var config =
{
    host: 'ncamysql.mysql.database.azure.com',
    user: 'ncauser@ncamysql',
    password: 'Password123%',
    database: 'notejam',
    port: 3306,
    ssl: true
};

const db = new mysql.createConnection(config);

db.connect(
    function (err) { 
    if (err) { 
        console.log("!!! Cannot connect !!! Error:");
        throw err;
    }
    else
    {
       console.log("Connection established.");
           queryDatabase();
    }
});

function queryDatabase(){
    db.query('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,email VARCHAR(75) NOT NULL,password VARCHAR(128) NOT NULL);', function (err, results, fields) { 
        if (err) throw err; 
        console.log('Created Users table.');
    })
    db.query('CREATE TABLE IF NOT EXISTS pads (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,name VARCHAR(100) NOT NULL,user_id INTEGER NOT NULL REFERENCES users(id));', 
            function (err, results, fields) {
                if (err) throw err;
        console.log('Created Pads table.');
    })
    db.query('CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,pad_id INTEGER REFERENCES pads(id),user_id INTEGER NOT NULL REFERENCES users(id),name VARCHAR(100) NOT NULL,text text NOT NULL,created_at default current_timestamp,updated_at default current_timestamp);', 
            function (err, results, fields) {
                if (err) throw err;
        console.log('Created Notes table.');
    })
    db.query('INSERT INTO users VALUES (?, ?, ?);', [1, 'user1@example.com', '$2a$10$mhkqpUvPPs.zoRSTiGAEKODOJMljkOY96zludIIw.Pop1UvQCTx8u'], 
            function (err, results, fields) {
                if (err) throw err;
        else console.log('Inserted ' + results.affectedRows + ' row(s).');
        })
    db.query('INSERT INTO users VALUES (?, ?, ?);', [2, 'user2@example.com', '$2a$10$mhkqpUvPPs.zoRSTiGAEKODOJMljkOY96zludIIw.Pop1UvQCTx8u'], 
            function (err, results, fields) {
                if (err) throw err;
        console.log('Inserted ' + results.affectedRows + ' row(s).');
        })
    db.query('INSERT INTO pads VALUES (?, ?, ?);', [1, 'Pad 1', 1], 
    function (err, results, fields) {
                if (err) throw err;
        console.log('Inserted ' + results.affectedRows + ' row(s).');
        })
    db.query('INSERT INTO pads VALUES (?, ?, ?);', [2, 'Pad 2', 1], 
    function (err, results, fields) {
                if (err) throw err;
        console.log('Inserted ' + results.affectedRows + ' row(s).');
        })
    db.query('INSERT INTO notes VALUES (?, ?, ?, ?, ?, ?, ?);', [1, 1, 1, 'Note 1', 'Text', 1, 1], 
    function (err, results, fields) {
                if (err) throw err;
        console.log('Inserted ' + results.affectedRows + ' row(s).');
        })
    db.query('INSERT INTO notes VALUES (?, ?, ?, ?, ?, ?, ?);', [2, 1, 1, 'Note 2', 'Text', 1, 1], 
    function (err, results, fields) {
                if (err) throw err;
        console.log('Inserted ' + results.affectedRows + ' row(s).');
        })
    db.end(function (err) { 
    if (err) throw err;
    else  console.log('Done.') 
    });
};