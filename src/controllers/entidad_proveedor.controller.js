const { sequelize } = require("../configs/database.configs");
require('dotenv').config();
const EntidadProveedor = require('../models/entidad_proveedor.models');
const { v4: uuidv4 } = require('uuid');

const crearEntidadProveedor = async (req, res) => {
    const { entidad } = req.body;
    try {
        const entidadProveedor = await EntidadProveedor.create({
            id: uuidv4(),
            entidad
        });
        return res.status(200).json({
            ok: true,
            mensaje: 'Entidad proveedor creada correctamente',
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            mensaje: 'Error al crear la entidad proveedor',
        });
    }
}

const listarEntidadesProveedor = async (req, res) => {
    try {
        const entidades_proveedor = await EntidadProveedor.findAll();
        return res.status(200).json({
            ok: true,
            entidades_proveedor
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            mensaje: 'Error al listar las entidades proveedor',
        });
    }
}

const buscarEntidadProveedorPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const entidadProveedor = await EntidadProveedor.findOne({
            where: {
                id
            }
        });
        return res.status(200).json({
            ok: true,
            entidadProveedor
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            mensaje: 'Error al buscar la entidad proveedor',
        });
    }
}

const actualizarEntidadProveedor = async (req, res) => {
    const { id } = req.params;
    const { entidad } = req.body;
    try {
        const entidadProveedor = await EntidadProveedor.update({
            entidad
        }, {
            where: {
                id
            }
        });
        return res.status(200).json({
            ok: true,
            mensaje: 'Entidad proveedor actualizada correctamente',
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            mensaje: 'Error al actualizar la entidad proveedor',
        });
    }
}

module.exports = {
    crearEntidadProveedor,
    listarEntidadesProveedor,
    buscarEntidadProveedorPorId,
    actualizarEntidadProveedor
}

