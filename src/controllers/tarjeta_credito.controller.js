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
const BloqueoTarjeta = require('../models/bloqueo_tarjeta.models');
const EliminacionTarjeta = require('../models/eliminacion_tarjeta.models');
const Moneda = require('../models/moneda.models');
const MotivoBloqueo = require('../models/motivo_bloqueo.models');
const MotivoEliminacion = require('../models/motivo_eliminacion.models');

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

        //validr el tipo de tarjeta para aplicar el tipo de cambio
        if (tarjetaCredito.id_tipo_tarjeta === '089eec8b-afa8-44b5-b518-6bbc7d60aa3c') {
            const tipoCambio = await Configuracion.findOne({ where: { id: '2dc1d051-7055-409e-b86c-09b969f99936' }, transaction });
            montoDecimal = montoDecimal * parseFloat(tipoCambio.valor);
        }

        //calcular el nuevo saldo
        const saldoActual = parseFloat(tarjetaCredito.saldo);
        const nuevoSaldo = saldoActual - montoDecimal;

        if (nuevoSaldo < 0) {

            const cantidad_rechazos = tarjetaCredito.cantidad_rechazos + 1;

            if (cantidad_rechazos >= 3) {
                await tarjetaCredito.update({ cantidad_rechazos, bloqueado: true }, { transaction });
                await BloqueoTarjeta.create({
                    id: uuidv4(),
                    id_tarjeta: tarjetaCredito.id,
                    fecha_bloqueo: new Date(),
                    comentario: 'La tarjeta ha sido rechazada 3 veces por superar el límite de crédito',
                    id_motivo: '1a0f5523-ad70-4809-a94e-733e5614aa8b'
                }, { transaction });
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

        //validr el tipo de tarjeta para aplicar el tipo de cambio
        if (tarjetaCredito.id_tipo_tarjeta === '089eec8b-afa8-44b5-b518-6bbc7d60aa3c') {
            const tipoCambio = await Configuracion.findOne({ where: { id: '2dc1d051-7055-409e-b86c-09b969f99936' }, transaction });
            montoDecimal = montoDecimal * parseFloat(tipoCambio.valor);
        }

        if (nuevoSaldo > parseFloat(tarjetaCredito.limite_credito)) {
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

const bloquearTarjeta = async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
        const { id_tarjeta, id_motivo, comentario } = req.body;

        //recuperar la tarjeta de crédito
        const tarjetaCredito = await TarjetaCredito.findByPk(id_tarjeta, { transaction });
        if (!tarjetaCredito) {
            await transaction.rollback();
            return res.status(404).json({ ok: false, mensaje: 'No se encontró la tarjeta de crédito' });
        }

        //verificar si la tarjeta de crédito ya está bloqueada
        if (tarjetaCredito.bloqueado) {
            await transaction.rollback();
            return res.status(400).json({ ok: false, mensaje: 'La tarjeta de crédito ya está bloqueada' });
        }

        //actualizar el estado de la tarjeta de crédito
        await tarjetaCredito.update({ bloqueado: true }, { transaction });

        //guardar el registro en la tabla bloqueo tarjeta
        await BloqueoTarjeta.create({
            id: uuidv4(),
            id_tarjeta: id_tarjeta,
            fecha_bloqueo: new Date(),
            comentario: comentario,
            id_motivo
        }, { transaction });

        await transaction.commit();

        return res.status(200).json({
            ok: true,
            mensaje: 'Tarjeta de crédito bloqueada correctamente'
        });

    } catch (error) {
        await transaction.rollback();
        console.log(error);
        return res.status(500).json({ ok: false, mensaje: error.message });
    }
};

const desbloquearTarjeta = async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
        const { id_tarjeta } = req.body;

        //recuperar la tarjeta de crédito
        const tarjetaCredito = await TarjetaCredito.findByPk(id_tarjeta, { transaction });
        if (!tarjetaCredito) {
            await transaction.rollback();
            return res.status(404).json({ ok: false, mensaje: 'No se encontró la tarjeta de crédito' });
        }

        //verificar si la tarjeta de crédito ya está desbloqueada
        if (!tarjetaCredito.bloqueado) {
            await transaction.rollback();
            return res.status(400).json({ ok: false, mensaje: 'La tarjeta de crédito ya está desbloqueada' });
        }

        //actualizar el estado de la tarjeta de crédito
        await tarjetaCredito.update({ bloqueado: false }, { transaction });

        await transaction.commit();

        return res.status(200).json({
            ok: true,
            mensaje: 'Tarjeta de crédito desbloqueada correctamente'
        });

    } catch (error) {
        await transaction.rollback();
        console.log(error);
        return res.status(500).json({ ok: false, mensaje: error.message });
    }
}

const eliminarTarjeta = async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
        const { id_tarjeta, id_motivo_eliminacion, comentario } = req.body;

        //recuperar la tarjeta de crédito
        const tarjetaCredito = await TarjetaCredito.findByPk(id_tarjeta, { transaction });
        if (!tarjetaCredito) {
            await transaction.rollback();
            return res.status(404).json({ ok: false, mensaje: 'No se encontró la tarjeta de crédito' });
        }

        //verificar si la tarjeta de crédito ya está eliminada
        if (tarjetaCredito.eliminada) {
            await transaction.rollback();
            return res.status(400).json({ ok: false, mensaje: 'La tarjeta de crédito ya está eliminada' });
        }


        await EliminacionTarjeta.create({
            id: uuidv4(),
            id_tarjeta: id_tarjeta,
            id_motivo_eliminacion: id_motivo_eliminacion,
            comentario
        }, { transaction });


        //actualizar el estado de la tarjeta de crédito
        await tarjetaCredito.update({ eliminada: true }, { transaction });

        await transaction.commit();

        return res.status(200).json({
            ok: true,
            mensaje: 'Tarjeta de crédito eliminada correctamente'
        });

    } catch (error) {
        await transaction.rollback();
        console.log(error);
        return res.status(500).json({ ok: false, mensaje: error.message });
    }
}

const listarTarjetas = async (req, res) => {
    try {
        const tarjetas = await TarjetaCredito.findAll({
            include: [
                {
                    model: TipoTarjeta,
                    as: 'tipoTarjeta',
                    attributes: ['id', 'tipo'],
                    include: {
                        model: Moneda,
                        as: 'moneda',
                        attributes: ['id', 'simbolo'],
                    },
                },
            ],
        });

        return res.status(200).json({ ok: true, tarjetas });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, mensaje: error.message });
    }
};

const listarTarjetaPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const tarjeta = await TarjetaCredito.findByPk(id, {
            include: [
                {
                    model: TipoTarjeta,
                    as: 'tipoTarjeta',
                    attributes: ['id', 'tipo'],
                    include: {
                        model: Moneda,
                        as: 'moneda',
                        attributes: ['id', 'simbolo'],
                    },
                },
            ],
        });

        if (!tarjeta) {
            return res.status(404).json({ ok: false, mensaje: 'Tarjeta no encontrada' });
        }

        return res.status(200).json({ ok: true, tarjeta });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, mensaje: error.message });
    }
};

//mostrar movimiento de tarjeta por id
const listarMovimientoPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const movimientos = await Movimiento.findAll({
            where: { id_tarjeta_credito: id },
            order: [['fecha', 'DESC']]
        });

        if (!movimientos) {
            return res.status(404).json({ ok: false, mensaje: 'Movimientos no encontrados' });
        }

        return res.status(200).json({ ok: true, movimientos });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, mensaje: error.message });
    }
};

const listarMotivosBloqueoPorTarjeta = async (req, res) => {
    const { id } = req.params;

    try {
        const bloqueos = await BloqueoTarjeta.findAll({
            where: { id_tarjeta: id },
            include: [
                {
                    model: TarjetaCredito,
                    as: 'tarjeta',
                    attributes: ['id', 'nombre_tarjeta', 'numero_tarjeta']
                },
                {
                    model: MotivoBloqueo,
                    as: 'motivoBloqueo',
                    attributes: ['id', 'motivo']
                }
            ]
        });
        res.json({bloqueos: bloqueos});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const listarEliminacionesPorTarjeta = async (req, res) => {
    const { id } = req.params;

    try {
        const eliminaciones = await EliminacionTarjeta.findAll({
            where: { id_tarjeta: id },
            include: [
                {
                    model: MotivoEliminacion,
                    as: 'motivoEliminacion',
                    attributes: ['id', 'motivo']
                },
                {
                    model: TarjetaCredito,
                    as: 'tarjeta',
                    attributes: ['id', 'nombre_tarjeta', 'numero_tarjeta']
                }
            ]
        });
        res.json({eliminaciones:eliminaciones});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//obtener tarjeta por id del usuario
const listarTarjetaPorIdUsuario = async (req, res) => {
    const { id } = req.params;

    try {
        const tarjeta = await TarjetaCredito.findOne({
            where: { id_usuario: id }
        });

        if (!tarjeta) {
            return res.status(404).json({ ok: false, mensaje: 'No se encontró la tarjeta' });
        }

        return res.status(200).json({ ok: true, tarjeta });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, mensaje: error.message });
    }
}



module.exports = {
    crearTarjetaCredito,
    generarDebito,
    generarCredito,
    bloquearTarjeta,
    desbloquearTarjeta,
    eliminarTarjeta,
    listarTarjetas,
    listarTarjetaPorId,
    listarMovimientoPorId,
    listarMotivosBloqueoPorTarjeta,
    listarEliminacionesPorTarjeta,
    listarTarjetaPorIdUsuario
}














