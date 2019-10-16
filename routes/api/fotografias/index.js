var express = require('express');
var router = express.Router();


router.get('/', function (req, res) {
    res.json({
      "entity": "fotografias",
      "version": "0.0.1"
    });
  })