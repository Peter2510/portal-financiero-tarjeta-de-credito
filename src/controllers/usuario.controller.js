const { sequelize } = require("../configs/database.configs");
require('dotenv').config();
const Usuario = require('../models/usuario.models');
const Rol = require('../models/rol.models');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require("bcrypt");

const crearUsuario = async (req, res) => {
    const { nombre, correo_electronico: correo_electronico, direccion, documento_identificacion, telefono, id_rol, a2f_activo, pin } = req.body;
    // crear el pin con bcrypt
    const hashedPin = await bcrypt.hash(pin, 10);

    try {
        const usuario = await Usuario.create({
            id: uuidv4(),
            nombre,
            correo_electronico: correo_electronico,
            direccion,
            documento_identificacion,
            telefono,
            id_rol,
            a2f_activo,
            pin: hashedPin
        });
        return res.status(201).json({
            ok: true,
            mensaje: "Usuario creado correctamente",
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok: false,
            mensaje: "Error al crear el usuario"
        });
    }

}

const obtenerUsuarioPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await Usuario.findByPk(id, {
            include: [{ model: Rol, as: 'rol' }]
        });
        if (usuario) {

            //eliminar el pin
            usuario.pin = undefined;

            return res.status(200).json({
                ok: true,
                usuario
            });
        }
        return res.status(404).json({
            ok: false, mensaje: "Usuario no encontrado"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            mensaje: "Error al obtener el usuario"
        });
    }
}

const actualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombre, correo_electronico, direccion, documento_identificacion, telefono, id_rol, a2f_activo } = req.body;
    try {
        const usuario = await Usuario.findByPk(id);
        if (usuario) {
            usuario.nombre = nombre;
            usuario.correo_electronico = correo_electronico;
            usuario.direccion = direccion;
            usuario.documento_identificacion = documento_identificacion;
            usuario.telefono = telefono;
            usuario.id_rol = id_rol;
            usuario.a2f_activo = a2f_activo;
            await usuario.save();
            return res.status(200).json({
                ok: true,
                usuario
            });
        }
        return res.status(404).json({
            mensaje: "Usuario no encontrado"
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            mensaje: "Error al actualizar el usuario"
        });
    }
}

//actualizar pin de usuario validando el pin anterior
const actualizarPinUsuario = async (req, res) => {
    const { id } = req.params;
    const { pin, nuevo_pin } = req.body;
    try {
        const usuario = await Usuario.findByPk(id);
        if (usuario) {
            const validPin = await bcrypt.compare(pin, usuario.pin);
            if (validPin) {
                const hashedPin = await bcrypt.hash(nuevo_pin, 10);
                usuario.pin = hashedPin;
                await usuario.save();
                return res.status(200).json({
                    ok: true,
                    mensaje: "Pin actualizado correctamente"
                });
            }
            return res.status(400).json({
                ok: false,
                mensaje: "El pin actual no es correcto"
            });
        }
        return res.status(404).json({
            mensaje: "Usuario no encontrado"
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            mensaje: "Error al actualizar el pin del usuario"
        });
    }
}

module.exports = {
    crearUsuario,
    obtenerUsuarioPorId,
    actualizarUsuario,
    actualizarPinUsuario
}