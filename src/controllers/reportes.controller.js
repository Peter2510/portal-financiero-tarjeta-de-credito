

const { Op } = require('sequelize');
const EliminacionTarjeta = require('../models/eliminacion_tarjeta.models');
const Movimiento = require('../models/movimiento.models');
const TarjetaCredito = require('../models/tarjeta_credito.models');

class ReporteController {
    // Obtener conteo de eliminaciones por motivo
    async obtenerConteoEliminaciones(req, res) {
        try {
            const conteo = await EliminacionTarjeta.findAll({
                attributes: [
                    'id_motivo_eliminacion',
                    [sequelize.fn('COUNT', sequelize.col('id')), 'total']
                ],
                group: 'id_motivo_eliminacion',
                include: [
                    {
                        model: TarjetaCredito,
                        as: 'tarjeta',
                        attributes: ['nombre_tarjeta'],
                    }
                ]
            });

            res.json({ ok: true, conteo });
        } catch (error) {
            console.error(error);
            res.status(500).json({ ok: false, mensaje: 'Error al obtener el conteo de eliminaciones.' });
        }
    }

    // Obtener conteo de movimientos por tipo
    async obtenerConteoMovimientos(req, res) {
        try {
            const { fechaInicio, fechaFin } = req.query;

            const conteo = await Movimiento.findAll({
                attributes: [
                    'id_tipo_movimiento',
                    [sequelize.fn('COUNT', sequelize.col('id')), 'total']
                ],
                group: 'id_tipo_movimiento',
                where: {
                    fecha: {
                        [Op.gte]: fechaInicio ? new Date(fechaInicio) : undefined,
                        [Op.lte]: fechaFin ? new Date(fechaFin) : undefined
                    }
                },
                include: [
                    {
                        model: TarjetaCredito,
                        as: 'tarjeta',
                        attributes: ['nombre_tarjeta'],
                    }
                ]
            });

            res.json({ ok: true, conteo });
        } catch (error) {
            console.error(error);
            res.status(500).json({ ok: false, mensaje: 'Error al obtener el conteo de movimientos.' });
        }
    }
}

module.exports = new ReporteController();
