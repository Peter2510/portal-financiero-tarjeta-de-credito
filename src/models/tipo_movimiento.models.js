const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/database.configs');

const TipoMovimiento = sequelize.define(
  'TipoMovimiento',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    tipo:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
  },
  {
    tableName: 'tipo_movimiento',
    timestamps: true, 
  }
);


module.exports = TipoMovimiento;