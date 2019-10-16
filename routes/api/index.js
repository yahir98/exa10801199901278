var express= require('express');
var router = express.Router();

//Rutas de cada Entidad
var fotosApiRoutes = require('./fotografias/index');
//localhost:3000/api/con/
router.use('/fo',fotosApiRoutes);

module.exports=router;