const express = require('express');
const authController = require('../controllers/auth.controller');
const utilidades = require('../configs/utilidades');

const router = express.Router();
const api = '/api/v1/auth';

// router.post(`${api}/login`,authController.login);
// router.post(`${api}/logOut`,authController.logOut);
// router.post(`${api}/enable-2fa`, utilidades.iniciar);
// router.post(`${api}/verify-2fa`, utilidades.verificar);
// router.post(`${api}/cambioCredenciales`, authController.cambioCredenciales);

module.exports = router;