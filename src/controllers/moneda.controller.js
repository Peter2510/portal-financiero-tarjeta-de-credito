const { sequelize } = require("../configs/database.configs");
require('dotenv').config();
const Moneda = require("../models/moneda.models");
const { v4: uuidv4 } = require('uuid');


const crearMoneda = async (req, res) => {
    const { simbolo, codigo_pais } = req.body;
    try {
        const moneda = await Moneda.create({
            id: uuidv4(),
            simbolo,
            codigo_pais
        });
        return res.status(201).json({
            ok: true,
            mensaje: "Moneda creada exitosamente",
        });
    } catch (error) {
      console.log(error);
        return res.status(500).json({
            ok: false,
            mensaje: "Error al crear la moneda",
        });
    }
};

const listarMonedas = async (req, res) => {
    try {
        const monedas = await Moneda.findAll();
        return res.status(200).json({
            ok: true,
            monedas,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            mensaje: "Error al obtener las monedas",
        });
    }
}

module.exports = {
    crearMoneda,
    listarMonedas
};