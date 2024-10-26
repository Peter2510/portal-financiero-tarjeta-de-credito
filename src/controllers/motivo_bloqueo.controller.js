const { sequelize } = require("../configs/database.configs");
require('dotenv').config();
const MotivoBloqueo = require('../models/motivo_bloqueo.models');
const { v4: uuidv4 } = require('uuid');

const crearMotivoBloqueo = async (req, res) => {
    try {
        const { motivo } = req.body;
        console.log(motivo, "--------------------------------------");
        const id = uuidv4();
        const motivoBloqueo = await MotivoBloqueo.create({ id, motivo });
        return res.status(201).json({ 
            ok: true,
            mensaje: 'Motivo de bloqueo creado correctamente'
        });
    } catch (error) {
        return res.status(500).json({ ok: false, mensaje: error.message });
    }
}

const listarMotivosBloqueo = async (req, res) => {
    try {
        const motivos_bloqueo = await MotivoBloqueo.findAll();
        return res.status(200).json({
            ok: true,
            motivos_bloqueo
        });
    } catch (error) {
        return res.status(500).json({ ok: false, mensaje: error.message });
    }
}

module.exports = {
    crearMotivoBloqueo,
    listarMotivosBloqueo
};
