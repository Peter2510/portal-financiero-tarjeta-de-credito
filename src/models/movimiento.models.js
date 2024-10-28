const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/database.configs');
const TipoMovimiento = require("./tipo_movimiento.models");
const TarjetaCredito = require("./tarjeta_credito.models");

const Movimiento = sequelize.define(
  'Movimiento',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    "id_tipo_movimiento": {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: TipoMovimiento,
        key: 'id'
      },
      validate: {
        notNull: {
          msg: "El id de tipo de movimiento no puede ser nulo",
        },
        notEmpty: {
          msg: "El id de tipo de movimiento no puede ser vacio",
        },
      },
    },
    descripcion: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        notNull: {
          msg: "La descripcion no puede ser nula",
        },
        notEmpty: {
          msg: "La descripcion no puede ser vacia",
        },
      },
    },
   debito: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: true
   },
   credito: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: true
   },
   "saldo_disponible": {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false,
    validate: {
      notNull: {
        msg: "El saldo disponible no puede ser nulo",
      },
      notEmpty: {
        msg: "El saldo disponible no puede ser vacio",
      },
    },
   },
   "id_tarjeta_credito": {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: TarjetaCredito,
      key: 'id'
    },
    validate: {
      notNull: {
        msg: "El id la tarjeta de credito no puede ser nulo",
      },
      notEmpty: {
        msg: "El id de la tarjeta de credito no puede ser vacio",
      },
    },
   },
  },
  {
    tableName: 'movimiento',
    timestamps: true,
  }
);


module.exports = Movimiento;