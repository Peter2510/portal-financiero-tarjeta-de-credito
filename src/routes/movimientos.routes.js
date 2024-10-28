const express = require('express');
const MovimientoController = require('../controllers/movimiento.controller');
const utilidades = require('../configs/utilidades');
const {validacionJWTAdmin} = require('../middlewares/validacionJWT');

const router = express.Router();
const api = '/tarjeta-credito/v1/movimiento';

router.post(`${api}/crear-motivo-eliminacion`, MovimientoController.crearMovimiento);
router.get(`${api}/listar-motivos-eliminacion`, MovimientoController.obtenerMovimientosPorIdTarjetaCredito);


module.exports = router;


