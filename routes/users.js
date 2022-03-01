var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get(
  '/users',
(req, res, next)=>
{
  res.send('Nnew Castle On!' +' '+ 'Dorinha!');
});


router.get(
  '/usersnovo/:parametro',
  (req,res,next)=>{
    console.log(req.params.parametro)
    res.send('Bem vindo pequeno gafanhoto!');
  }
);

router.post(
  '/userpost',
  (req,res,next) => {
    var nome= req.body.nome
    var sobrenome = req.body.sobrenome
    var contato = req.body.contato
    var endereco = req.body.endereco
    var resultado = {}

    resultado.status = 'ok'
    resultado.nome = nome
    resultado.sobrenome = sobrenome
    resultado.contato = contato
    resultado.endereco = endereco
    

    res.send(resultado);
  }
);
module.exports = router;
