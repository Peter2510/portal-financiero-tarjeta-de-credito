const express = require('express');
const tipoMovimientoController = require('../controllers/tipo_movimiento.controller');
const utilidades = require('../configs/utilidades');
const {validacionJWTAdmin} = require('../middlewares/validacionJWT');

const router = express.Router();
const api = '/tarjeta-credito/v1/tipo-movimiento';

router.post(`${api}/crear-tipo-movimiento`, tipoMovimientoController.crearTipoMovimiento);
router.get(`${api}/listar-tipos-movimientos`, tipoMovimientoController.listarTiposMovimiento);
router.get(`${api}/buscar-tipo-movimiento/:id`, tipoMovimientoController.buscarTipoMovimientoPorId);
router.put(`${api}/actualizar-tipo-movimiento/:id`, tipoMovimientoController.actualizarTipoMovimiento);

module.exports = router;