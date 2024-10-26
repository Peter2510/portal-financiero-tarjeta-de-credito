const { sequelize } = require("../configs/database.configs");
require('dotenv').config();
const Configuracion = require('../models/configuracion.models');
const { v4: uuidv4 } = require('uuid');

const crearConfiguracion = async (req, res) => {
    try {
        const { tipo, valor } = req.body;
        const id = uuidv4();
        const configuracion = await Configuracion.create({ id, tipo, valor });
        return res.status(201).json({ 
            ok: true,
            mensaje: 'Configuracion creada correctamente'
        });
    } catch (error) {
        return res.status(500).json({ ok: false, mensaje: error.message });
    }
}

const listarConfiguraciones = async (req, res) => {
    try {
        const configuraciones = await Configuracion.findAll();
        return res.status(200).json({
            ok: true,
            configuraciones
        });
    } catch (error) {
        return res.status(500).json({ ok: false, mensaje: error.message });
    }
}

const buscarConfiguracionPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const configuracion = await Configuracion.findByPk(id);
        if (!configuracion) {
            return res.status(404).json({ ok: false, mensaje: 'No se encontró la configuración' });
        }
        return res.status(200).json({ ok: true, configuracion });
    } catch (error) {
        return res.status(500).json({ ok: false, mensaje: error.message });
    }
}

const actualizarConfiguracion = async (req, res) => {
    try {
        const { id } = req.params;
        const { tipo, valor } = req.body;
        const configuracion = await Configuracion.findByPk(id);
        if (!configuracion) {
            return res.status(404).json({ ok: false, mensaje: 'No se encontró la configuración' });
        }
        await Configuracion.update({ tipo, valor }, { where: { id } });
        return res.status(200).json({ ok: true, mensaje: 'Configuración actualizada correctamente' });
    } catch (error) {
        return res.status(500).json({ ok: false, mensaje: error.message });
    }
}

module.exports = {
    crearConfiguracion,
    listarConfiguraciones,
    buscarConfiguracionPorId,
    actualizarConfiguracion
}