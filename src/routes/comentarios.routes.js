const express = require('express');
const comentariosController = require('../controllers/comentarios.controller');

const router = express.Router();
const api = '/tarjeta-credito/v1/comentarios';

router.post(`${api}/crear-comentario`, comentariosController.crearComentario);
router.get(`${api}/obtener-comentarios-by-id-tarjeta`, comentariosController.obtenerComentariosByIdTarjeta);
router.get(`${api}/obtener-ultima-n-cantidad-comentarios`, comentariosController.obtenerUltimaNCantidadComentarios);
router.get(`${api}/obtener-comentarios-by-usuario`, comentariosController.obtenerComentariosByUsuario);



module.exports = router;