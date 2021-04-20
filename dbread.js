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
           readData();
    }
});

function readData(){
    db.query('SELECT * FROM users', function (err, results, fields) { 
        if (err) throw err;
        else console.log('Selected ' + results.length + ' row(s).');
        for (i=0; i < results.length; i++) {
            console.log('Row: ' + JSON.stringify(results[i]));
        }
        console.log('Done.');
    })
    db.query('SELECT * FROM pads', function (err, results, fields) { 
        if (err) throw err;
        else console.log('Selected ' + results.length + ' row(s).');
        for (i=0; i < results.length; i++) {
            console.log('Row: ' + JSON.stringify(results[i]));
        }
        console.log('Done.');
    })
    db.query('SELECT * FROM notes', function (err, results, fields) { 
        if (err) throw err;
        else console.log('Selected ' + results.length + ' row(s).');
        for (i=0; i < results.length; i++) {
            console.log('Row: ' + JSON.stringify(results[i]));
        }
        console.log('Done.');
    })
    db.end(function (err) { 
    if (err) throw err;
    else  console.log('Closing Connection.') 
    });
};