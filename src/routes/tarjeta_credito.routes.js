const express = require('express');
const tarjetaCreditoController = require('../controllers/tarjeta_credito.controller');
const utilidades = require('../configs/utilidades');
const {validacionJWTCliente} = require('../middlewares/validacionJWT');

const router = express.Router();
const api = '/tarjeta-credito/v1/tarjeta';


router.post(`${api}/crear-tarjeta`, tarjetaCreditoController.crearTarjetaCredito);
routes.post(`${api}/generar-debito`, validacionJWTCliente, tarjetaCreditoController.crearTarjetaCredito);

module.exports = router;