const express = require('express');
const rolController = require('../controllers/rol.controller');
const utilidades = require('../configs/utilidades');
const {validacionJWTAdmin} = require('../middlewares/validacionJWT');

const router = express.Router();
const api = '/tarjeta-credito/v1/rol';

router.post(`${api}/crear-rol`, rolController.crearRol);
router.get(`${api}/listar-roles`, rolController.listarRoles);


module.exports = router;