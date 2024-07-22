const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'database',
    user: 'migyael',
    password: 'migyael',
    database: 'nodedb'
};

const mysql = require('mysql2')
const connection = mysql.createConnection(config)
const save = `INSERT INTO people(name) values('Migyael')`
connection.query(save)

app.get('/', (req, res) => {
    const get = `SELECT name FROM people`;
    connection.query(get, (err, results) => {
        if (err) throw err;

        const names = results.map(row => `<li>${row.name}</li>`).join('');
        res.send(`
        <h1>Full Cycle Rocks!</h1>
        <ul>${names}</ul>
      `);
    });
});

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})