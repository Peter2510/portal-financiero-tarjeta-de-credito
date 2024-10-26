const express = require('express');
const rolController = require('../controllers/rol.controller');
const utilidades = require('../configs/utilidades');
const {validacionJWTAdmin} = require('../middlewares/validacionJWT');

const router = express.Router();
const api = '/tarjeta-credito/v1/rol';

router.post(`${api}/crear-rol`, rolController.crearRol);
// router.post(`${api}/logOut`,authController.logOut);
// router.post(`${api}/enable-2fa`, utilidades.iniciar);
// router.post(`${api}/verify-2fa`, utilidades.verificar);
// router.post(`${api}/cambioCredenciales`, authController.cambioCredenciales);

module.exports = router;