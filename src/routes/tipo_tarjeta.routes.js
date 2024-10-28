const express = require('express');
const tipoTarjetaController = require('../controllers/tipo_tarjeta.controller');
const utilidades = require('../configs/utilidades');
const {validacionJWTAdmin} = require('../middlewares/validacionJWT');

const router = express.Router();
const api = '/tarjeta-credito/v1/tipo-tarjeta';

router.post(`${api}/crear-tipo-tarjeta`, tipoTarjetaController.crearTipoTarjeta);
router.get(`${api}/listar-tipos-tarjeta`, tipoTarjetaController.listarTipoTarjetas);
router.get(`${api}/listar-tipo-tarjeta/:id`, tipoTarjetaController.obtenerTipoTarjeta);

module.exports = router;

