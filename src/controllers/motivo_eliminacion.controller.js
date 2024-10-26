const { sequelize } = require("../configs/database.configs");
require('dotenv').config();
const MotivoEliminacion = require("../models/motivo_eliminacion.models");
const { v4: uuidv4 } = require('uuid');


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

module.exports = {
    crearMotivoEliminacion,
    listarMotivosEliminacion
};