var express = require('express');
var router = express.Router();

var mysql      = require('mysql');
const { response } = require('../app');
var connection = mysql.createConnection({
  host     : 'localhost',
  port     : '3306',
  user     : 'root',
  password : 'root',
  database : 'northwind'
});
 
connection.connect();

router.post(
'/realizarLogin',
(req,res) => {
    var login = req.body.login
    var senha = req.body.senha
    connection.query('SELECT login FROM loginuser where login = '+req.params.login,
         (resultado,error,fields) => {
             if(error) res.send(error);
             var resposta = {}
             resposta.status ='OK';
             resposta.dados = {
                 login: resultado[0]
                }
             }
        )
    }
)
router.get(
    '/loginALL', 
(req, res, next)=>
{
    connection.query('SELECT nome, sobrenome FROM loginuser', 
    (error, results, fields)=> {
       if (error) throw error;
       res.send(results);
    });
  
});

router.get(
    '/loginGetbyId/:id', 
(req, res, next)=>
{
    var id = parseInt(req.params.id)
    connection.query('SELECT nome, sobrenome from loginuser where idlogin = ?',[id], 
    (error, results, fields)=> {
       if (error) throw error;
       res.send(results);
    });
  
});

router.post(
'/logininserir',
(req,res) => { 
    var login = req.body.login
    var senha = req.body.senha
    var nome = req.body.nome
    var sobrenome = req.body.sobrenome
    connection.query('insert into loginuser(login,senha) values(?,?)',[login, senha],
         (resultado,erro) => {
              if(erro) res.send(erro);
             else res.send(resultado)
             }
        )
    }
)
router.patch(
    '/loginUp/:id',
    (req,res) => { 
        var id = parseInt(req.params.id) 
        var login = req.body.login
        var senha = req.body.senha
        var nome = req.body.nome
        var sobrenome = req.body.sobrenome
        connection.query('update loginuser set login = ?, senha = ?, nome = ?, sobrenome=?, where idlogin = ?',[login, senha,nome,sobrenome,id],
             (resultado,error) => {
                  if(error) res.send(error);
                  else res.send(resultado);
                 }
            )   
        }
)

router.delete(
    '/userdelete/:id',
    (req,res) => { 
        var id = parseInt(req.params.id)
        connection.query('delete from loginuser  where idlogin = ?',[id],
             (resultado,error) => {
                  if(error) res.send(error);
                 else res.send(resultado)
                 }
            )   
        }
)


module.exports = router;
