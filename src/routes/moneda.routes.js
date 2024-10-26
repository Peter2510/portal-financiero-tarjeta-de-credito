const express = require('express');
const monedaController = require('../controllers/moneda.controller');
const utilidades = require('../configs/utilidades');
const {validacionJWTAdmin} = require('../middlewares/validacionJWT');

const router = express.Router();
const api = '/tarjeta-credito/v1/moneda';

router.post(`${api}/crear-moneda`, monedaController.crearMoneda);
router.get(`${api}/listar-monedas`, monedaController.listarMonedas);


module.exports = router;