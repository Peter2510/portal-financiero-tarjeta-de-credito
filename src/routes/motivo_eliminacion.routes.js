const express = require('express');
const motivoEliminacion = require('../controllers/motivo_eliminacion.controller');
const utilidades = require('../configs/utilidades');
const {validacionJWTAdmin} = require('../middlewares/validacionJWT');

const router = express.Router();
const api = '/tarjeta-credito/v1/motivo-eliminacion';

router.post(`${api}/crear-motivo-eliminacion`, motivoEliminacion.crearMotivoEliminacion);
router.get(`${api}/listar-motivos-eliminacion`, motivoEliminacion.listarMotivosEliminacion);


module.exports = router;