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

        if (!usuario) {
            return res.status(404).json({ ok: false, mensaje: 'No se encontró el usuario' });
        }

        const tipoTarjeta = await TipoTarjeta.findByPk(id_tipo_tarjeta);

        if (!tipoTarjeta) {
            return res.status(404).json({ ok: false, mensaje: 'No se encontró el tipo de tarjeta' });
        }

        const entidadProveedor = await EntidadProveedor.findByPk(id_entidad_proveedor);

        if (!entidadProveedor) {
            return res.status(404).json({ ok: false, mensaje: 'No se encontró la entidad proveedora' });
        }

        nombre_tarjeta = `${usuario.nombre_usuario} ${tipoTarjeta.tipo} ${entidadProveedor.entidad}`;
        
        const tarjetaCredito = await TarjetaCredito.create({
            id: uuidv4(),
            id_tipo_tarjeta,
            fecha_creacion: Date,
            notificar_uso,
            limite_credito,
            nombre_tarjeta,
            numero_tarjeta: generarNumeroTarjeta(),
            cvv: generarCVV(),
            eliminada: false,
            cantidad_rechazos: 0,
            bloqueado: 0,
            id_usuario,
            saldo,
            id_entidad_proveedor 
        });
        return res.status(201).json({
            ok: true,
            mensaje: 'Tarjeta de crédito creada correctamente'
        });
    } catch (error) {
        return res.status(500).json({ ok: false, mensaje: error.message });
    }


    function generarNumeroTarjeta() {
        const numeroTarjeta = Math.floor(100000 + Math.random() * 900000);
        return numeroTarjeta;
    }

    function generarCVV() {
        const numeroTresDigitos = Math.floor(100 + Math.random() * 900);
        return numeroTresDigitos;
    }

}















