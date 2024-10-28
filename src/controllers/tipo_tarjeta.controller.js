const { sequelize } = require("../configs/database.configs");
const Moneda = require("../models/moneda.models");
require('dotenv').config();
const TipoTarjeta = require("../models/tipo_tarjeta.models");
const { v4: uuidv4 } = require('uuid');

const crearTipoTarjeta = async (req, res) => {
    const { tipo, id_moneda, limite_credito } = req.body;
    try {
        const tipo_tarjeta = await TipoTarjeta.create({
            id: uuidv4(),
            tipo,
            id_moneda,
            limite_credito
        });
        return res.status(201).json({
            ok: true,
            mensaje: "Tipo de tarjeta creado exitosamente",
        });
    } catch (error) {
        console.log(error);

        return res.json({
            ok: false,
            mensaje: "Error al crear el tipo de tarjeta",
        });
    }
}

const listarTipoTarjetas = async (req, res) => {
    const tipo_tarjetas = await TipoTarjeta.findAll({
        include: [
            {
                model: Moneda,
                as: "moneda",
                attributes: ["id", "simbolo", "codigo_pais"],
            },
        ],
    });
    return res.status(200).json({
        ok: true,
        tipo_tarjetas,
    });
}

const obtenerTipoTarjeta = async (req, res) => {
    try {
        const { id } = req.params;
        const tipo_tarjeta = await TipoTarjeta.findByPk(id);
        return res.status(200).json({
            ok: true,
            tipo_tarjeta
        });
    } catch (error) {
        return res.json({
            ok: false,
            mensaje: "Error al obtener el tipo de tarjeta",
        });
    }
}

module.exports = {
    crearTipoTarjeta,
    listarTipoTarjetas,
    obtenerTipoTarjeta
};

