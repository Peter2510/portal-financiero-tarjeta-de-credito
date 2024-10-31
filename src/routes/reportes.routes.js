const express = require('express');
const router = express.Router();
const reporteController = require('../controllers/reportes.controller');

const api = '/tarjeta-credito/v1';

// Rutas para reportes
router.get(`${api}/reportes/eliminaciones`, reporteController.obtenerConteoEliminaciones);
router.get(`${api}/reportes/movimientos`, reporteController.obtenerConteoMovimientos);

module.exports = router;
