const { sequelize } = require("../configs/database.configs");
const { DataTypes } = require("sequelize"); // <-- Add this import

const Rol = require("./rol.models");

const UsuarioWebService = sequelize.define(
    "UsuarioWebService",
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
        },
        llave: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                len: {
                    args: [3, 100],
                    msg: "La llave debe tener entre 3 y 100 caracteres",
                },
                notNull: {
                    msg: "La llave es requerida",
                },
                notEmpty: {
                    msg: "La llave no puede estar vacia",
                },
            },
        },
        pin: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                len: {
                    args: [3, 100],
                    msg: "El pin debe tener entre 3 y 100 caracteres",
                },
                notNull: {
                    msg: "El pin es requerido",
                },
                notEmpty: {
                    msg: "El pin no puede estar vacio",
                },
            },
        },
        "id_rol": {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Rol,
                key: "id",
            },
            validate: {
                notNull: {
                    msg: "El rol es requerido",
                },
                notEmpty: {
                    msg: "El rol no puede estar vacio",
                },
            },
        },
    },
    {
        tableName: "usuario_web_service",
        timestamps: true,
    }
);

module.exports = UsuarioWebService;