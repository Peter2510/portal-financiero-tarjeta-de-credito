const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/database.configs');
const Moneda = require('./moneda.models');

const TipoTarjeta = sequelize.define(
    'TipoTarjeta',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
        },
        tipo: {
            type: DataTypes.STRING(45),
            unique: true,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'El campo tipo no puede ser nulo'
                },
                notEmpty: {
                    msg: 'El campo tipo no puede estar vacío'
                },
                len: {
                    args: [3, 45],
                    msg: 'El campo tipo debe tener una longitud entre 3 y 45 caracteres'
                }
            }
        },
        "id_moneda": {
            type: DataTypes.UUID,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'El campo id_moneda no puede ser nulo'
                },
                notEmpty: {
                    msg: 'El campo id_moneda no puede estar vacío'
                }
            },
            references: {
                model: Moneda,
                key: 'id'
            }
        },
        "limite_credito": {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'El campo limite_credito no puede ser nulo'
                },
                notEmpty: {
                    msg: 'El campo limite_credito no puede estar vacío'
                },
                isDecimal: {
                    msg: 'El campo limite_credito debe ser un número decimal'
                }
            }
        },

    },
    {
        tableName: 'tipo_tarjeta',
        timestamps: true,
    }
);


module.exports = TipoTarjeta;