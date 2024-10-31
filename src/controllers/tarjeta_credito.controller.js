const { sequelize } = require("../configs/database.configs");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const TarjetaCredito = require('../models/tarjeta_credito.models');
const { v4: uuidv4 } = require('uuid');
const Usuario = require('../models/usuario.models');
const TipoTarjeta = require('../models/tipo_tarjeta.models');
const EntidadProveedor = require('../models/entidad_proveedor.models');
const Movimiento = require('../models/movimiento.models');
const Configuracion = require('../models/configuracion.models');

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
            saldo: limite_credito,
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

const generarDebito = async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
        const { monto, nombre_pasarela } = req.body;

        //convertir monto a número decimal
        let montoDecimal = parseFloat(monto);

        //recuperar y verificar el JWT
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const id_usuario = decoded.idUsuario;

        //recuperar la tarjeta de crrdito del usuario
        const tarjetaCredito = await TarjetaCredito.findOne({ where: { id_usuario }, transaction });
        if (!tarjetaCredito) {
            await transaction.rollback();
            return res.status(404).json({ ok: false, mensaje: 'No se encontró la tarjeta de crédito' });
        }

        if (tarjetaCredito.bloqueado) {
            await transaction.rollback();
            return res.status(423).json({ ok: false, mensaje: 'La tarjeta de crédito está bloqueada' });
        }

        if (tarjetaCredito.eliminada) {
            await transaction.rollback();
            return res.status(404).json({ ok: false, mensaje: 'La tarjeta de crédito fue eliminada anteriormente' });
        }

        //buscar configuración por uso de tarjeta de credito por id 
        const cobro = await Configuracion.findOne({ where: { id: '858e8954-27f4-420c-9284-c5bec043ab59' }, transaction });
        
        //calcular el monto con el cobro
        montoDecimal = montoDecimal + (montoDecimal * parseFloat(cobro.valor));

        //calcular el nuevo saldo
        const saldoActual = parseFloat(tarjetaCredito.saldo);
        const nuevoSaldo = saldoActual - montoDecimal;

        if(nuevoSaldo < 0){
            
            const cantidad_rechazos = tarjetaCredito.cantidad_rechazos + 1;

            if (cantidad_rechazos >= 3) {
                await tarjetaCredito.update({ cantidad_rechazos, bloqueado: true }, { transaction });
                await transaction.commit();
                return res.status(423).json({ ok: false, mensaje: 'La tarjeta ha sido rechazada 3 veces por superar el límite de crédito y ha sido bloqueada' });
            }

            await tarjetaCredito.update({ cantidad_rechazos }, { transaction });
            await transaction.commit();
            return res.status(400).json({ ok: false, mensaje: 'El monto supera el límite de crédito' });
        } 

        //actualizar el saldo de la tarjeta de crédito
        await tarjetaCredito.update({ saldo: nuevoSaldo }, { transaction });

        //guardar el registro en la tabla movimientos con un nuevo ID único
        await Movimiento.create({
            id: uuidv4(),
            id_tipo_movimiento: '02fc0bda-1756-43e2-959f-5156805f1281',
            id_tarjeta_credito: tarjetaCredito.id,
            fecha: new Date(),
            debito: montoDecimal,
            credito: 0,
            saldo_disponible: nuevoSaldo,
            descripcion: `Compra en ${nombre_pasarela}`
        }, { transaction });

        await transaction.commit();

        return res.status(200).json({
            ok: true,
            mensaje: 'Débito generado correctamente'
        });
        
    } catch (error) {
        await transaction.rollback();
        console.log(error);
        return res.status(500).json({ ok: false, mensaje: error.message });
    }
};


const generarCredito = async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
        const { monto, nombre_pasarela } = req.body;

        //convertir monto a número decimal
        let montoDecimal = parseFloat(monto);
        if (isNaN(montoDecimal)) {
            return res.status(400).json({ ok: false, mensaje: 'El monto debe ser un número válido' });
        }

        //recuperar y verificar el JWT
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const id_usuario = decoded.idUsuario;

        //recuperar la tarjeta de crédito del usuario
        const tarjetaCredito = await TarjetaCredito.findOne({ where: { id_usuario }, transaction });
        if (!tarjetaCredito) {
            await transaction.rollback();
            return res.status(404).json({ ok: false, mensaje: 'No se encontró la tarjeta de crédito' });
        }

        if (tarjetaCredito.bloqueado) {
            await transaction.rollback();
            return res.status(423).json({ ok: false, mensaje: 'La tarjeta de crédito está bloqueada' });
        }

        if (tarjetaCredito.eliminada) {
            await transaction.rollback();
            return res.status(404).json({ ok: false, mensaje: 'La tarjeta de crédito fue eliminada anteriormente' });
        }
       
        //calcular el nuevo saldo
        const saldoActual = parseFloat(tarjetaCredito.saldo);
        const nuevoSaldo = parseFloat(saldoActual + montoDecimal);

               
        if(nuevoSaldo > parseFloat(tarjetaCredito.limite_credito)){
            await transaction.rollback();
            return res.status(400).json({ ok: false, mensaje: 'El monto supera el saldo disponible que brinda la tarjeta' });
        }

        //actualizar el saldo de la tarjeta de crédito
        await tarjetaCredito.update({ saldo: nuevoSaldo }, { transaction });

        //guardar el registro en la tabla movimientos con un nuevo ID único
        await Movimiento.create({
            id: uuidv4(),
            id_tipo_movimiento: 'b51ce914-931d-4d5a-9e4d-149f7c32d623',
            id_tarjeta_credito: tarjetaCredito.id,
            fecha: new Date(),
            debito: 0,
            credito: montoDecimal,
            saldo_disponible: nuevoSaldo,
            descripcion: `Crédito en ${nombre_pasarela}`
        }, { transaction });

        await transaction.commit();

        return res.status(200).json({
            ok: true,
            mensaje: 'Crédito generado correctamente'
        });
        
    } catch (error) {
        await transaction.rollback();
        console.log(error);
        return res.status(500).json({ ok: false, mensaje: error.message });
    }
};




module.exports = {
    crearTarjetaCredito,
    generarDebito,
    generarCredito
}














