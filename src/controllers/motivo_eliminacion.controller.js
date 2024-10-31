const { sequelize } = require("../configs/database.configs");
require('dotenv').config();
const MotivoEliminacion = require("../models/motivo_eliminacion.models");
const { v4: uuidv4 } = require('uuid');
const EliminacionTarjeta = require("../models/eliminacion_tarjeta.models");
const TarjetaCredito = require("../models/tarjeta_credito.models");


const crearMotivoEliminacion = async (req, res) => {
    const { motivo } = req.body;
    try {
        const motivo_eliminacion = await MotivoEliminacion.create({
            id: uuidv4(),
            motivo
        });
        return res.status(201).json({
            ok: true,
            mensaje: "Motivo de eliminación creado exitosamente",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            mensaje: "Error al crear el motivo de eliminación",
        });
    }
}

const listarMotivosEliminacion = async (req, res) => {
    try {
        const motivos_eliminacion = await MotivoEliminacion.findAll();
        return res.status(200).json({
            ok: true,
            motivos_eliminacion,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            mensaje: "Error al obtener los motivos de eliminación",
        });
    }
}

const listarEliminacionesPorTarjeta = async (req, res) => {
    const { idTarjeta } = req.params;

    try {
        const eliminaciones = await EliminacionTarjeta.findAll({
            where: { id_tarjeta: idTarjeta },
            include: [
                {
                    model: MotivoEliminacion,
                    as: 'motivoEliminacion',
                    attributes: ['id', 'motivo']
                },
                {
                    model: TarjetaCredito,
                    as: 'tarjeta',
                    attributes: ['id', 'nombre_tarjeta', 'numero_tarjeta']
                }
            ]
        });
        res.json(eliminaciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    crearMotivoEliminacion,
    listarMotivosEliminacion,
    listarEliminacionesPorTarjeta
};