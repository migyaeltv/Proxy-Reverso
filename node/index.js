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

const createTableSql = `
CREATE TABLE IF NOT EXISTS people (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);
`;
connection.query(createTableSql, (err, results, fields) => {
    if (err) {
        console.error('Erro ao criar a tabela `people`:', err);
        return;
    }
    console.log('Tabela `people` criada com sucesso.');
});

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