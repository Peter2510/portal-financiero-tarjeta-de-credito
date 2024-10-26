const { sequelize } = require("../configs/database.configs");
require('dotenv').config();
const Rol = require("../models/rol.models");
const { v4: uuidv4 } = require('uuid');


const crearRol = async (req, res) => {
  try {
    const { nombre } = req.body;
    
    //generar el UUID
    const id = uuidv4();

    //crear el rol con el UUID
    await Rol.create({ id, nombre });

    res.status(200).json({ ok: true, mensaje: "Rol creado exitosamente" });

  } catch (error) {
    console.log(error);
    return res.json({ ok: false, mensaje: "Error al crear el rol" });
  }
};

module.exports = {
    crearRol
};