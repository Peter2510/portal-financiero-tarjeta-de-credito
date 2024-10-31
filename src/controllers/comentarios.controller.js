const { sequelize } = require("../configs/database.configs");
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const Comentario = require('../models/comentario_beneficios.models');

const crearComentario = async (req, res) => {
    const { idTarjeta, idUsuario, comentario } = req.body;
    try {
        const nuevoComentario = await Comentario.create({
            id: uuidv4(),
            idUsuario,
            comentario,
            idTarjeta
        });
        return res.status(201).json({
            ok: true,
            mensaje: 'Comentario creado correctamente',
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            mensaje: 'Error al crear el comentario',
        });
    }
}

const obtenerComentariosByIdTarjeta = async (req, res) => {
    const { idTarjeta } = req.params;
    try {
        const comentarios = await Comentario.findAll({
            where: {
                idTarjeta
            }
        });
        return res.status(200).json({
            ok: true,
            comentarios,
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            mensaje: 'Error al obtener los comentarios',
        });
    }
}

const obtenerUltimaNCantidadComentarios = async (req, res) => {
    const { cantidad } = req.params;
    try {
        const comentarios = await Comentario.findAll({
            limit: cantidad,
            order: [
                ['createdAt', 'DESC']
            ]
        });
        return res.status(200).json({
            ok: true,
            comentarios,
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            mensaje: 'Error al obtener los comentarios',
        });
    }
}

const obtenerComentariosByUsuario = async (req, res) => {
    const { idUsuario } = req.params;
    try {
        const comentarios = await Comentario.findAll({
            where: {
                idUsuario
            }
        });
        return res.status(200).json({
            ok: true,
            comentarios,
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            mensaje: 'Error al obtener los comentarios',
        });
    }
}

module.exports = {
    crearComentario,
    obtenerComentariosByIdTarjeta,
    obtenerUltimaNCantidadComentarios,
    obtenerComentariosByUsuario
}