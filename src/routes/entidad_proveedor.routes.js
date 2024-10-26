const express = require('express');
const EntidadProveedorController = require('../controllers/entidad_proveedor.controller');
const utilidades = require('../configs/utilidades');
const {validacionJWTAdmin} = require('../middlewares/validacionJWT');

const router = express.Router();
const api = '/tarjeta-credito/v1/entidad-proveedor';

router.post(`${api}/crear-entidad-proveedor`, EntidadProveedorController.crearEntidadProveedor);
router.get(`${api}/listar-entidades-proveedor`, EntidadProveedorController.listarEntidadesProveedor);
router.get(`${api}/buscar-entidad-proveedor/:id`, EntidadProveedorController.buscarEntidadProveedorPorId);
router.put(`${api}/actualizar-entidad-proveedor/:id`, EntidadProveedorController.actualizarEntidadProveedor);


module.exports = router;