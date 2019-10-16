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

 

  module.exports = router;