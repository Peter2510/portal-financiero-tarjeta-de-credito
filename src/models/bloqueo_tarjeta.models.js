const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/database.configs');
const Tarjeta = require('./tarjeta_credito.models');

const BloqueoTarjeta = sequelize.define(
    'BloqueoTarjeta',
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
        "fecha_bloqueo": {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'El campo fecha_bloqueo no puede ser nulo'
                },
                notEmpty: {
                    msg: 'El campo fecha_bloqueo no puede estar vacío'
                },
            },
        },
        "fecha_desbloqueo": {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        tableName: 'eliminacion_tarjeta',
        timestamps: true,
    }
);


module.exports = BloqueoTarjeta;