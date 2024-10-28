const { sequelize } = require("../configs/database.configs");
require('dotenv').config();
const Movimiento = require("../models/movimiento.models");
const { v4: uuidv4 } = require('uuid');

const crearMovimiento = async (req, res) => {
    try {
        const { id_tipo_movimiento, descripcion, id_tarjeta_credito, debito, credito  } = req.body;
        
        const nuevoMovimiento = await Movimiento.create({
            id: uuidv4(),
            id_tipo_movimiento,
            descripcion,
            id_tarjeta_credito,
            debito,
            credito,
            saldo_disponible

        });
        return res.status(201).json({
            ok: true,
            mensaje: "Movimiento creado exitosamente",
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            mensaje: "Error al crear el movimiento",
        });
    }
}

const obtenerMovimientosPorIdTarjetaCredito = async (req, res) => {
    try {
        const { id_tarjeta_credito } = req.params;
        const movimientos = await Movimiento.findAll({
            where: {
                id_tarjeta_credito,
            },
        });
        return res.status(200).json({
            ok: true,
            movimientos,
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            mensaje: "Error al obtener los movimientos",
        });
    }
}

module.exports = {
    crearMovimiento,
    obtenerMovimientosPorIdTarjetaCredito,
};