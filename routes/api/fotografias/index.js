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
           "id": parseInt(req.body.id),
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




 
 router.put('/update/:foCodigo',
  function(req, res){
      foCollection = fileModel.getfotografias();
      var foCodigoToModify = req.params.foCodigo;
      var amountToAdjust = parseInt(req.body.ajustar);
      var adjustType = req.body.tipo || 'SUB';
      var adjustHow = (adjustType == 'ADD' ? 1 : -1);
      var modfotografias = {};
      var newfotografiasArray = foCollection.map(
        function(o,i){
          if( foCodigoToModify === o.codigo){
             o.album = adjustType;
             modfotografias = Object.assign({}, o);
          }
          return o;
        }
      ); // end map
    foCollection = newfotografiasArray;
    fileModel.setfotografias(
      foCollection,
      function (err, savedSuccesfully) {
        if (err) {
          res.status(400).json({ "error": "No se pudo actualizar objeto" });
        } else {
          res.json(modfotografias);  // req.body ===  $_POST[]
        }
      }
    );
  }
);// put :prdsku




//delete

router.delete(
    '/delete/:foCodigo',
    function( req, res) {
      foCollection = fileModel.getfotografias();
      var foCodigoToDelete  = req.params.conCodigo;
      var newfoCollection = foCollection.filter(
        function(o, i){
          return foCodigoToDelete !== o.codigo;
        }
      ); //filter
      foCollection = newfoCollection;
      fileModel.setfotografias(
        foCollection,
        function (err, savedSuccesfully) {
          if (err) {
            res.status(400).json({ "error": "No se pudo eliminar objeto" });
          } else {
            res.json({"newProdsQty": foCollection.length});
          }
        }
      );
    }
  );// delete


  module.exports = router;