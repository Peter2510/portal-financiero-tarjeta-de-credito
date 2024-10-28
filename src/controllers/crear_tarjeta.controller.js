const { sequelize } = require("../configs/database.configs");
require('dotenv').config();
const TarjetaCredito = require('../models/tarjeta_credito.models');
const { v4: uuidv4 } = require('uuid');
const Usuario = require('../models/usuario.models');
const TipoTarjeta = require('../models/tipo_tarjeta.models');
const EntidadProveedor = require('../models/entidad_proveedor.models');

const crearTarjetaCredito = async (req, res) => {
    try {
        const { id_tipo_tarjeta, fecha_creacion, notificar_uso, limite_credito, nombre_tarjeta, numero_tarjeta, cvv, eliminada, cantidad_rechazos, bloqueado, id_usuario, saldo, id_entidad_proveedor } = req.body;
        
        //serch user by id
        const usuario = await Usuario.findByPk(id_usuario);

        const tipoCuenta = await TipoTarjeta.findByPk(id_tipo_cuenta);

        if (!tipoCuenta) {
            return res.status(404).json({ ok: false, mensaje: 'No se encontró el tipo de cuenta' });
        }

        const entidadProveedor = await EntidadProveedor.findByPk(id_entidad_proveedor);



        if (!usuario) {
            return res.status(404).json({ ok: false, mensaje: 'No se encontró el usuario' });
        }





        
        const id = uuidv4();
        const tarjetaCredito = await TarjetaCredito.create({ id, id_tipo_tarjeta, fecha_creacion, notificar_uso, limite_credito, nombre_tarjeta, numero_tarjeta, cvv, eliminada, cantidad_rechazos, bloqueado, id_usuario, saldo, id_entidad_proveedor });
        return res.status(201).json({
            ok: true,
            mensaje: 'Tarjeta de crédito creada correctamente'
        });
    } catch (error) {
        return res.status(500).json({ ok: false, mensaje: error.message });
    }
}















