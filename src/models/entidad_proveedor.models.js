const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/database.configs');

const EntidadProveedor = sequelize.define(
    'EntidadProveedor',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
        },
        entidad: {
            type: DataTypes.STRING(45),
            unique: true,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'El campo entidad no puede ser nulo'
                },
                notEmpty: {
                    msg: 'El campo entidad no puede estar vacío'
                },
                len: {
                    args: [3, 45],
                    msg: 'El campo entidad debe tener una longitud entre 3 y 45 caracteres'
                }
            }
        }
    },
    {
        tableName: 'entidad_proveedor',
        timestamps: true,
    }
);


module.exports = EntidadProveedor;