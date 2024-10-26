
const speakeasy = require("speakeasy");
const nodemailer = require("nodemailer");
const NodeCache = require("node-cache");
const jwt = require("jsonwebtoken"); // Importing jsonwebtoken
const Usuario = require("../models/usuario.models");
require("dotenv").config();

//configuración de caché con un TTL (time-to-live) de 5 minutos
const cache = new NodeCache({ stdTTL: 300, checkperiod: 60 });

//endpoint to enable two-way authentication
const iniciar = async (req, res) => {
  const { correoElectronico } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use SSL
    auth: {
      user: process.env.CORREO,
      pass: process.env.PASSWORD,
    },
  });

  try {
    const secret = speakeasy.generateSecret();
    const token = speakeasy.totp({
      secret: secret.base32,
      encoding: "base32",
    });

    // Almacenar el código y el secreto en caché
    cache.set(correoElectronico, { secret: secret.base32, token });

    const mensaje = `<h1>Tu código es: ${token}</h1>`;

    await transporter.sendMail({
      to: correoElectronico,
      subject: "Código de verificación",
      html: mensaje,
    });

    console.log("Email enviado ", token);
    return res
      .status(200)
      .json({
        ok: true, 
        a2f: true,
        mensaje: "Código enviado al correo electrónico" });
  } catch (err) {
    console.error("Error al enviar el código de verificación", err);
    return res
      .status(500)
      .json({
        ok: false,
        mensaje: "Error al enviar el código de verificación",
      });
  }
};

const verificar = async (req, res) => {
  const { correoElectronico, token } = req.body;

  const cachedData = cache.get(correoElectronico);
  if (!cachedData) {
    return res
      .status(401)
      .json({ estado: "error", mensaje: "Código expirado o no encontrado" });
  }

  const { secret } = cachedData;

  const verified = speakeasy.totp.verify({
    secret: secret,
    encoding: "base32",
    token: token,
    window: 1,
  });

  if (verified) {
    cache.del(correoElectronico);

    const user = await Persona.findOne({
      where: { correoElectronico },
    });

    const usuario = await Usuario.findOne({
      where: { idPersona: user.id },
    });

    const token = jwt.sign(
      {
        idUsuario: usuario.id,
        idTipoUsuario: usuario.idTipoUsuario,
        nombreUsuario: usuario.nombreUsuario,
        a2fActivo: usuario.a2fActivo,
        nombre: user.nombre,
        direccion: user.direccion,
        fechaCreacion: user.fechaCreacion,
        correoElectronico: user.correoElectronico,
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true, //solo se puede acceder desde el servidor
        maxAge: 1000 * 60 * 60, //1 hora de duración
      })
      .json({
        ok: true,
        a2f: false,
        mensaje: "Inicio de sesión correcto",
        token,
      });
  } else {
    res.status(401).json({ ok: false, mensaje: "Código no válido" });
  }
};



module.exports = {
  iniciar: iniciar,
  verificar: verificar};