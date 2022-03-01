var express = require('express');
var router = express.Router();

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  port : '3306',
  user     : 'root',
  password : 'root',
  database : 'northwind'
});
 
connection.connect();

/* GET users listing. */
router.get
('/banco', 
(req, res, next)=>
{
    connection.query
    ('select * from products limit 5', 
    (error, results, fields)=> {
       if (error) throw error;
       res.send(results);
    });
  
});

router.get
('/bancoall', 
(req, res, next)=>
{
    connection.query
    ('select * from products', 
    (error, results, fields)=> {
       if (error) throw error;
       res.send(results);
    });
  
});
module.exports = router;
