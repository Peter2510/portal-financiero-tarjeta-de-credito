const express = require('express');
const motivoBloqueoController = require('../controllers/motivo_bloqueo.controller');
const utilidades = require('../configs/utilidades');
const {validacionJWTAdmin} = require('../middlewares/validacionJWT');

const router = express.Router();
const api = '/tarjeta-credito/v1/motivo-bloqueo';

router.post(`${api}/crear-motivo-bloqueo`, motivoBloqueoController.crearMotivoBloqueo);
router.get(`${api}/listar-motivos-bloqueo`, motivoBloqueoController.listarMotivosBloqueo);


module.exports = router;