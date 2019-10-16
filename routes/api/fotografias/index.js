var express = require('express');
var router = express.Router();

var fileModel = require('../filemodel');

var conCollection = fileModel.getfotografias();

router.get('/', function (req, res) {
    res.json({
      "entity": "fotografias",
      "version": "0.0.1"
    });
  })


  router.get('/all', function(req, res){
    foCollection = fileModel.getfotografias();
    res.json(foCollection);
  }); // get /all

 

  
router.post('/new', function(req, res){
    foCollection = fileModel.getfotografias();
    var newfotografias = Object.assign(
       {},
       req.body,
       {
           "title": req.body.nombre,
           "url":req.body.apartament,
           "thumbnailUrl":req.body.thum,
           "album ":req.body.album
           //"cuotaMensual": parseFloat(req.body.cuotaMensual)
       }
    );
    var fotografiasExists = foCollection.find(
      function(o, i){
        return o.codigo === newfotografias.codigo;
      }
    )
    if( ! fotografiasExists ){
      foCollection.push(newfotografias);
      fileModel.setfotografias(
         foCollection,
         function(err, savedSuccesfully){
           if(err){
             res.status(400).json({ "error": "No se pudo ingresar objeto" });
           } else {
             res.json(newfotografias);  // req.body ===  $_POST[]
           }
         }
       );
    } else {
      res.status(400).json({"error":"No se pudo ingresar objeto"});
    }
 });




  module.exports = router;