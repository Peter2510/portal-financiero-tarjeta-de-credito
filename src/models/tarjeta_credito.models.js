const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/database.configs');
const TipoTarjeta = require('./tipo_tarjeta.models');
const Usuario = require('./usuario.models');
const EntidadProveedor = require('./entidad_proveedor.models');

const TarjetaCredito = sequelize.define(
    'TarjetaCredito',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
        },
        "id_tipo_tarjeta": {
            type: DataTypes.UUID,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'El id_tipo_tarjeta es requerido'
                }
            },
            references: {
                model: TipoTarjeta,
                key: 'id'
            }
        },
        "fecha_creacion":{
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'La fecha_creacion es requerida'
                }
            },
        },
        "notificar_uso":{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'El notificar_uso es requerido'
                }
            },
        },
        "limite_credito":{
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'El limite_credito es requerido'
                }
            }
        },
        "nombre_tarjeta":{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'El nombre_tarjeta es requerido'
                }
            }
        },
        "numero_tarjeta":{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'El numero_tarjeta es requerido'
                }
            }
        },
        "cvv":{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'El cvv es requerido'
                }
            }
        },
        eliminada:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'La eliminada es requerida'
                }
            }
        },
        cantidad_rechazos:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'La cantidad_rechazos es requerida'
                }
            }
        },
        bloqueado:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'El bloqueado es requerido'
                }
            }
        },
        "id_usuario":{
            type: DataTypes.UUID,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'El id_usuario es requerido'
                }
            },
            references: {
                model: Usuario,
                key: 'id'
            }
        },
        saldo: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'El saldo es requerido'
                }
            }
        },
        "id_entidad_proveedor":{
            type: DataTypes.UUID,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'El id_entidad_proveedor es requerido'
                }
            },
            references: {
                model: EntidadProveedor,
                key: 'id'
            }
        },

    },
    {
        tableName: 'tarjeta_credito',
        timestamps: true,
    }
);


module.exports = TarjetaCredito;