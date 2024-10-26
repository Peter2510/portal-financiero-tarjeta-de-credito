const { sequelize } = require("../configs/database.configs");
require('dotenv').config();
const UsuarioWebService = require('../models/usuario_web_service.models');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require("bcrypt");

const crearUsuarioWebService = async (req, res) => {
    const { llave, pin, id_rol } = req.body;
    try {
        const hashedPin = await bcrypt.hash(pin, 10);
        const usuario = await UsuarioWebService.create({
            id:uuidv4(),
            llave,
            pin: hashedPin,
            id_rol
        });
        return res.status(201).json({
            ok: true,
            mensaje: "Usuario web service creado correctamente"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ 
            ok: false,
            mensaje: "Error al crear el usuario web service"
         });
    }
}

const obtenerUsuariosWebService = async (req, res) => {
    try {
        const usuarios = await UsuarioWebService.findAll();
        return res.status(200).json({
            ok: true,
            usuarios
        });
    } catch (error) {
        return res.status(500).json({ 
            ok: false,
            mensaje: "Error al obtener los usuarios web service"
         });
    }
}

module.exports = {
    crearUsuarioWebService,
    obtenerUsuariosWebService
}


