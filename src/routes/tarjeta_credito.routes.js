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
router.get(`${api}/listar-tarjetas`, tarjetaCreditoController.listarTarjetas);
router.get(`${api}/listar-tarjeta/:id`, tarjetaCreditoController.listarTarjetaPorId);
//listar por movimientos
router.get(`${api}/listar-movimientos/:id`, tarjetaCreditoController.listarMovimientoPorId);
//listarMotivosBloqueoPorTarjeta
router.get(`${api}/listar-motivos-bloqueo/:id`, tarjetaCreditoController.listarMotivosBloqueoPorTarjeta);
// Listar Eliminaciones por Tarjeta
router.get(`${api}/listar-eliminaciones/:id`, tarjetaCreditoController.listarEliminacionesPorTarjeta);
//listarTarjetaPorIdUsuario
router.get(`${api}/listar-tarjeta-usuario/:id`, tarjetaCreditoController.listarTarjetaPorIdUsuario);
//crear tarjeta credito y cleinte crearUsuarioYTarjetaCredito
router.post(`${api}/crear-usuario-tarjeta`, tarjetaCreditoController.crearUsuarioYTarjetaCredito);

module.exports = router;