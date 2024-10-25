const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/database.configs');
const Usuario = require('./usuario.models');

const ComentarioBeneficios = sequelize.define(
    'ComentarioBeneficios',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
        },
        id_usuario: {
            type: DataTypes.UUID,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'El campo id_usuario no puede ser nulo'
                }
            },
            references: {
                model: Usuario,
                key: 'id'
            }
        },
        comentario: {
            type: DataTypes.STRING(5),
            unique: true,
            allowNull: false
        }
    },
    {
        tableName: 'comentario_beneficios',
        timestamps: true,
    }
);


module.exports = ComentarioBeneficios;