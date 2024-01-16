// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Create connection to database
const mysql = require('mysql');
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_comments'
});

// Connect to database
conn.connect((err) => {
    if (err) throw err;
    console.log('Mysql Connected...');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Get all comments
app.get('/api/comments', (req, res) => {
    let sql = "SELECT * FROM comments";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
});

// Get single comment
app.get('/api/comments/:id', (req, res) => {
    let sql = "SELECT * FROM comments WHERE id=" + req.params.id;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
});

// Add new comment
app.post('/api/comments', (req, res) => {
    let data = { name: req.body.name, comment: req.body.comment };
    let sql = "INSERT INTO comments SET ?";
    let query = conn.query(sql, data, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
});

// Update comment
app.put('/api/comments/:id', (req, res) => {
    let sql = "UPDATE comments SET name='" + req.body.name + "', comment='" + req.body.comment + "' WHERE id=" + req.params.id;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
});