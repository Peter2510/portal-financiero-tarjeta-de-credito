const { sequelize } = require("../configs/database.configs");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();


const crearCliente = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { nombreUsuario, contrasenia, persona } = req.body;

    const email = await Persona.findOne({
      where: { correoElectronico: persona.correoElectronico },
      transaction: t,
    });

    if (email) {
      await t.rollback();
      return res
        .status(409)
        .json({ ok: false, mensaje: "Correo electronico ya registrado" });
    }

    if (!contrasenia) {
      await t.rollback();
      return res
        .status(400)
        .json({ ok: false, mensaje: "La contraseña es requerida" });
    }

    if (contrasenia.length < 8) {
      await t.rollback();
      return res
        .status(400)
        .json({
          ok: false,
          mensaje: "La contraseña debe tener al menos 8 caracteres",
        });
    }

    // Se crea la persona
    const newPersona = await Persona.create(persona, { transaction: t });

    // Se crea el usuario
    const hashedPassword = await bcrypt.hash(contrasenia, 10);
    await Usuario.create({
      nombreUsuario,
      contrasenia: hashedPassword,
      idPersona: newPersona.id,
      idTipoUsuario: 2,
    }, { transaction: t });

    await t.commit();
    res.status(200).json({ ok: true, mensaje: "Registrado correctamente" });

  } catch (error) {
    await t.rollback();
    await manejoErrores(error, res, "Usuario");
  }
};

module.exports = {
    crearCliente
};