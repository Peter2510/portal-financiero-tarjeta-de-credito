const { sequelize } = require("../configs/database.configs");
require('dotenv').config();
const TipoMovimiento = require('../models/tipo_movimiento.models');
const { v4: uuidv4 } = require('uuid');

const crearTipoMovimiento = async (req, res) => {
    const { tipo } = req.body;
    try {
        const tipoMovimiento = await TipoMovimiento.create({
            id: uuidv4(),
            tipo
        });
        return res.status(200).json({
            ok: true,
            mensaje: 'Tipo de movimiento creado correctamente',
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            mensaje: 'Error al crear el tipo de movimiento',
        });
    }
}

const listarTiposMovimiento = async (req, res) => {
    try {
        const tipos_movimiento = await TipoMovimiento.findAll();
        return res.status(200).json({
            ok: true,
            tipos_movimiento
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            mensaje: 'Error al listar los tipos de movimiento',
        });
    }
}

const buscarTipoMovimientoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const tipoMovimiento = await TipoMovimiento.findOne({
            where: {
                id
            }
        });
        return res.status(200).json({
            ok: true,
            tipoMovimiento
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            mensaje: 'Error al buscar el tipo de movimiento',
        });
    }
}

const actualizarTipoMovimiento = async (req, res) => {
    const { id } = req.params;
    const { tipo } = req.body;
    try {
        await TipoMovimiento.update({
            tipo
        }, {
            where: {
                id
            }
        });
        return res.status(200).json({
            ok: true,
            mensaje: 'Tipo de movimiento actualizado correctamente',
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            mensaje: 'Error al actualizar el tipo de movimiento',
        });
    }
}

module.exports = {
    crearTipoMovimiento,
    listarTiposMovimiento,
    buscarTipoMovimientoPorId,
    actualizarTipoMovimiento
}