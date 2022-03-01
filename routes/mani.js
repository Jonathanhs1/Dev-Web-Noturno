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
    '/maniGetAll', 
(req, res, next)=>
{
    connection.query('SELECT CategoryName, Description FROM categories', 
    (error, results, fields)=> {
       if (error) throw error;
       res.send(results);
    });
  
});

router.get(
    '/maniGetbyId/:id', 
(req, res, next)=>
{
    var id = parseInt(req.params.id)
    connection.query('SELECT CategoryName, Description from categories where categoryID = ?',[id], 
    (error, results, fields)=> {
       if (error) throw error;
       res.send(results);
    });
  
});

router.post(
'/manidolly',
(req,res) => { 
    var CategoryName = req.body.CategoryName
    var Description = req.body.Description
    connection.query('insert into categories(CategoryName, Description) values(? ,?)',[CategoryName, Description],
         (resultado,error) => {
              if(error) res.send(error);
             else res.send(resultado);
             }
        )
    }
)
router.patch(
    '/mani/:id',
    (req,res) => { 
        var id = parseInt(req.params.id)
        var CategoryName = req.body.CategoryName
        var Description = req.body.Description
        connection.query('update categories set CategoryName = ?, Description = ? where CategoryID = ?',[CategoryName, Description,id],
             (resultado,error) => {
                  if(error) res.send(error);
                 else res.send(resultado)
                 }
            )   
        }
)

router.delete(
    '/mani/:id',
    (req,res) => { 
        var id = parseInt(req.params.id)
        connection.query('delete from categories  where CategoryID = ?',[id],
             (resultado,error) => {
                  if(error) res.send(error);
                 else res.send(resultado)
                 }
            )   
        }
)
module.exports = router;
