const express = require('express');
const usuarioController = require('../controllers/usuario.controller');
const utilidades = require('../configs/utilidades');

const router = express.Router();
const api = '/tarjeta-credito/v1/usuario';

router.post(`${api}/crear-usuario`, usuarioController.crearUsuario);
router.get(`${api}/obtener-usuario/:id`, usuarioController.obtenerUsuarioPorId);
router.put(`${api}/actualizar-usuario/:id`, usuarioController.actualizarUsuario);
router.put(`${api}/actualizar-pin/:id`, usuarioController.actualizarPinUsuario);


module.exports = router;