const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/database.configs');
const MotivoEliminacion = require('./motivo_eliminacion.models');
const Tarjeta = require('./tarjeta_credito.models');

const EliminacionTarjeta = sequelize.define(
    'EliminacionTarjeta',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
        },
        "id_tarjeta": {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Tarjeta,
                key: 'id',
            },
            validate: {
                notNull: {
                    msg: 'El campo id_tarjeta no puede ser nulo'
                },
                notEmpty: {
                    msg: 'El campo id_tarjeta no puede estar vacío'
                },
            },
        },
        "id_motivo_eliminacion": {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: MotivoEliminacion,
                key: 'id',
            },
            validate: {
                notNull: {
                    msg: 'El campo id_motivo_eliminacion no puede ser nulo'
                },
                notEmpty: {
                    msg: 'El campo id_motivo_eliminacion no puede estar vacío'
                },
            },
        },
        "id_tarjeta": {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Tarjeta,
                key: 'id',
            },
            validate: {
                notNull: {
                    msg: 'El campo id_tarjeta no puede ser nulo'
                },
                notEmpty: {
                    msg: 'El campo id_tarjeta no puede estar vacío'
                },
            },
        },
        comentario: {
            type: DataTypes.STRING(255),
            allowNull: true,
            validate: {
                len: {
                    args: [3, 255],
                    msg: 'El campo comentario debe tener una longitud entre 3 y 255 caracteres'
                }
            }
        },
    },
    {
        tableName: 'eliminacion_tarjeta',
        timestamps: true,
    }
);


module.exports = EliminacionTarjeta;