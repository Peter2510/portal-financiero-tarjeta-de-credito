const express = require('express');
const authController = require('../controllers/auth.controller');
const utilidades = require('../configs/utilidades');

const router = express.Router();
const api = '/tarjeta-credito/v1/auth';

router.post(`${api}/login`, authController.login);
router.post(`${api}/generar-token-web-service`, authController.generarTokenWebService);
router.get(`${api}/validar-exitencia-usuario/:correo_electronico`, authController.validarCorreo);


module.exports = router;