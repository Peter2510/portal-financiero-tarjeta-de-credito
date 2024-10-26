const express = require('express');
const configuracionController = require('../controllers/configuracion.controller');
const utilidades = require('../configs/utilidades');
const {validacionJWTAdmin} = require('../middlewares/validacionJWT');

const router = express.Router();
const api = '/tarjeta-credito/v1/configuracion';

router.post(`${api}/crear-configuracion`, configuracionController.crearConfiguracion);
router.get(`${api}/listar-configuraciones`, configuracionController.listarConfiguraciones);
router.get(`${api}/buscar-configuracion/:id`, configuracionController.buscarConfiguracionPorId);
router.put(`${api}/actualizar-configuracion/:id`, configuracionController.actualizarConfiguracion);


module.exports = router;