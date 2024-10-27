const { sequelize } = require("../configs/database.configs");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const utilidades = require("../configs/utilidades");
require('dotenv').config();
const Usuario = require("../models/usuario.models");
const UsuarioWebService = require("../models/usuario_web_service.models");


const login = async (req, res) => {
  try {
    const { correo_electronico, pin } = req.body;

    const user = await Usuario.findOne({
      where: { correo_electronico },
    });

    if (!user) {
      return res.status(401).json({ ok: false, mensaje: "Credenciales incorrectas" });
    }

    const pinValido = await bcrypt.compare(pin, user.pin);

    if (!pinValido) {
      return res.status(401).json({ ok: false, mensaje: "Credenciales incorrectas" });
    }


    //validar el a2f si esta activado
    if (user.a2f_activo) {
      return await utilidades.iniciar(req, res);
    }

    const token = jwt.sign(
      {
        idUsuario: user.id,
        idRol: user.id_rol
      },
      process.env.JWT_KEY,
      { expiresIn: "3h" }
    );

    res.status(200)
      .cookie('token', token, {
        httpOnly: true,
        maxAge: 3000 * 60 * 60 //3 hora de duración
      }).json({
        ok: true,
        a2f: false,
        mensaje: "Inicio de sesión correcto",
        token
      })


  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, mensaje: "Error interno del servidor" });
  }
};

const generarTokenWebService = async (req, res) => {

  try {
    const { llave, pin } = req.body;
    const usuario = await UsuarioWebService.findOne({ where: { llave } });

    if (usuario) {
      const validacion = await bcrypt.compare(pin, usuario.pin);
      if (validacion) {

        const token = jwt.sign(
          {
            idUsuario: usuario.id,
            idRol: usuario.id_rol
          },
          process.env.JWT_KEY,
          { expiresIn: "3h" }
        );

        return res.status(200)
          .cookie('token', token, {
            httpOnly: true,
            maxAge: 3000 * 60 * 60 //3 hora de duración
          }).json({
            ok: true,
            token
          });
      }
    }

    return res.status(404).json({
      ok: false,
      mensaje: "Credenciales incorrectas"
    });


  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, mensaje: "Error interno del servidor" });
  }
}

module.exports = {
  login,
  generarTokenWebService
};