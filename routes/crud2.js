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
router.get(
    '/crudGetAll', 
(req, res, next)=>
{
    connection.query('SELECT RegionDescription FROM region', 
    (error, results, fields)=> {
       if (error) throw error;
       res.send(results);
    });
  
});

router.get(
    '/crud2GetbyId/:id', 
(req, res, next)=>
{
    var id = parseInt(req.params.id);
    connection.query('SELECT RegionDescription from region where RegionID = ?',[id], 
    (error, results, fields)=> {
       if (error) throw error;
       res.send(results);
    });
  
});

router.post(
'/crud2',
(req,res) => { 
    var RegionDescription = req.body.RegionDescription
    var Description = req.body.Description
    connection.query('insert into region(RegionDescription) values(?)',[RegionDescription]),
         (resultado,error) => {
              if(error) res.send(error);
             else res.send(resultado);
         }
    }
)
router.patch(
    '/crud2/:id',
    (req,res) => { 
        var id = parseInt(req.params.id)
        var RegionDescription = req.body.RegionDescription
        var Description = req.body.Description
        connection.query('update region set RegionDescription = ? where RegionID = ?',[RegionDescription, id],
             (resultado,error) => {
                  if(error) res.send(error);
                 else res.send(resultado)
                 }
            )   
        }
)

router.delete(
    '/crud2/:id',
    (req,res) => { 
        var id = parseInt(req.params.id)
        connection.query('delete from region  where RegionID = ?',[id],
             (resultado,error) => {
                  if(error) res.send(error);
                 else res.send(resultado)
                 }
            )   
        }
)
module.exports = router;
