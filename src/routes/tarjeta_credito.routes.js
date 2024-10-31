const express = require('express');
const tarjetaCreditoController = require('../controllers/tarjeta_credito.controller');
const utilidades = require('../configs/utilidades');
const {validacionJWTCliente} = require('../middlewares/validacionJWT');

const router = express.Router();
const api = '/tarjeta-credito/v1/tarjeta';


router.post(`${api}/crear-tarjeta`, tarjetaCreditoController.crearTarjetaCredito);
router.post(`${api}/generar-debito`, validacionJWTCliente, tarjetaCreditoController.generarDebito);
router.post(`${api}/generar-credito`, validacionJWTCliente, tarjetaCreditoController.generarCredito);
// bloquearTarjeta, desbloquearTarjeta, eliminarTarjeta
router.post(`${api}/bloquear-tarjeta`, tarjetaCreditoController.bloquearTarjeta);
router.post(`${api}/desbloquear-tarjeta`, tarjetaCreditoController.desbloquearTarjeta);
router.post(`${api}/eliminar-tarjeta`, tarjetaCreditoController.eliminarTarjeta);

module.exports = router;