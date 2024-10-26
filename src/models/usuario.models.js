const { sequelize } = require("../configs/database.configs");
const { DataTypes } = require("sequelize"); // <-- Add this import

const Rol = require("./rol.models");

const Usuario = sequelize.define(
    "Usuario",
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                len: {
                    args: [3, 100],
                    msg: "El nombre debe tener entre 3 y 100 caracteres",
                },
                notNull: {
                    msg: "El nombre es requerido",
                },
                notEmpty: {
                    msg: "El nombre no puede estar vacio",
                },
            },
        },
        "nombre_usuario": {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
            validate: {
                len: {
                    args: [3, 50],
                    msg: "El nombre de usuario debe tener entre 3 y 50 caracteres",
                },
                notNull: {
                    msg: "El nombre de usuario es requerido",
                },
                notEmpty: {
                    msg: "El nombre de usuario no puede estar vacio",
                },
            },
        },
        direccion: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "La dirección es requerida",
                },
                notEmpty: {
                    msg: "La dirección no puede estar vacia",
                },
            },
        },
        "documento_identificacion": {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
            validate: {
                len: {
                    args: [3, 20],
                    msg: "El documento de identificación debe tener entre 3 y 20 caracteres",
                },
                notNull: {
                    msg: "El documento de identificación es requerido",
                },
                notEmpty: {
                    msg: "El documento de identificación no puede estar vacio",
                },
            },
        },
        telefono: {
            type: DataTypes.STRING(9),
            allowNull: false,
            validate: {
                len: {
                    args: [8, 9],
                    msg: "El teléfono debe tener entre 8 y 9 caracteres",
                },
                notNull: {
                    msg: "El teléfono es requerido",
                },
                notEmpty: {
                    msg: "El teléfono no puede estar vacio",
                },
            },
        },
        "id_rol":{
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
        "a2f_activo":{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        pin: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                len: {
                    args: [6, 100],
                    msg: "El pin debe tener entre 6 y 100 caracteres",
                },
                notNull: {
                    msg: "El pin es requerido",
                },
                notEmpty: {
                    msg: "El pin no puede estar vacio",
                },
            },
        },
    },
    {
        tableName: "usuario",
        timestamps: true,
    }
);

module.exports = Usuario;