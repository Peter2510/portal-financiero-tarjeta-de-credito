const express = require('express');
const UsuarioWebServiceController = require('../controllers/usuario_web_service.controller');
const utilidades = require('../configs/utilidades');

const router = express.Router();
const api = '/tarjeta-credito/v1/usuario-web-service';

router.post(`${api}/crear-usuario-web-service`, UsuarioWebServiceController.crearUsuarioWebService);
router.get(`${api}/obtener-usuarios-web-service`, UsuarioWebServiceController.obtenerUsuariosWebService);


module.exports = router;