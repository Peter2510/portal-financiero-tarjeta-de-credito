const { sequelize } = require("../configs/database.configs");
require('dotenv').config();
const TarjetaCredito = require('../models/tarjeta_credito.models');
const { v4: uuidv4 } = require('uuid');
const Usuario = require('../models/usuario.models');
const TipoTarjeta = require('../models/tipo_tarjeta.models');
const EntidadProveedor = require('../models/entidad_proveedor.models');

const crearTarjetaCredito = async (req, res) => {
    try {
        const { id_tipo_tarjeta, notificar_uso, limite_credito, id_usuario, id_entidad_proveedor } = req.body;
        
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

        nombre_tarjeta = `${usuario.nombre_usuario}.${tipoTarjeta.tipo}@${entidadProveedor.entidad}.com`;
        
        const tarjetaCredito = await TarjetaCredito.create({
            id: uuidv4(),
            id_tipo_tarjeta,
            fecha_creacion: new Date(),
            notificar_uso,
            limite_credito,
            nombre_tarjeta,
            saldo: 0,
            numero_tarjeta: generarNumeroTarjeta(),
            cvv: generarCVV(),
            eliminada: false,
            cantidad_rechazos: 0,
            bloqueado: 0,
            id_usuario,
            id_entidad_proveedor 
        });


        return res.status(201).json({
            ok: true,
            mensaje: 'Tarjeta de crédito creada correctamente'
        });
    } catch (error) {
        console.log(error); 
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

//generar debito a la tarjeta de credito
const generarDredito = async (req, res) => {
    try {
       
        const { monto, nombre_tienda } = req.body;

        //recuperar el jwt del usuario
        const token = req.headers.authorization.split(' ')[1];

        //decodificar el token
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        //recuperar el id del usuario
        const id_usuario = decoded.idUsuario;

        //recuperar el id de la tarjeta de credito
        const id_tarjeta_credito = TarjetaCredito.findOne({ where: { id_usuario } }); 
       
        const tarjetaCredito = await TarjetaCredito.findByPk(id_tarjeta_credito);

        if (!tarjetaCredito) {
            return res.status(404).json({ ok: false, mensaje: 'No se encontró la tarjeta de crédito' });
        }

        if (tarjetaCredito.bloqueado === 1) {
            return res.status(400).json({ ok: false, mensaje: 'La tarjeta de crédito está bloqueada' });
        }

        if (tarjetaCredito.eliminada === 1) {
            return res.status(400).json({ ok: false, mensaje: 'La tarjeta de crédito ha sido eliminada' });
        }

        if (monto <= 0) {
            return res.status(400).json({ ok: false, mensaje: 'El monto debe ser mayor a 0' });
        }

        //si no se supera el limite de credito se actualiza el saldo
        const nuevoSaldo = tarjetaCredito.saldo + monto;

        //validar si el saldo es mayor al limite de credito
        if (nuevoSaldo > tarjetaCredito.limite_credito) {
            return res.status(400).json({ ok: false, mensaje: 'El monto supera el límite de crédito' });
        }

        //actualizar el saldo de la tarjeta de credito
        await TarjetaCredito.update({ saldo: nuevoSaldo }, { where: { id: id_tarjeta } });

        //guardar el registro en la tabla movimientos
        await Movimientos.create({
            id: uuidv4(),
            id_tipo_movimiento: '02fc0bda-1756-43e2-959f-5156805f1281',
            id_tarjeta_credito,
            fecha_creacion: new Date(),
            monto,
            tipo_movimiento: '',
            descripcion: `Compra en ${nombre_tienda}`,
            id_usuario
        });

        return res.status(200).json({
            ok: true,
            mensaje: 'Crédito generado correctamente'
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, mensaje: error.message });
    }
}

module.exports = {
    crearTarjetaCredito
}














