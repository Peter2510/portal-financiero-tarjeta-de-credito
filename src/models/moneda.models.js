const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/database.configs');

const Moneda = sequelize.define(
  'Moneda',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    simbolo:{
        type: DataTypes.STRING(5),
        unique: true,
        allowNull: false
    },
    codigo_pais:{
        type: DataTypes.STRING(5),
        unique: true,
        allowNull: false
    }
  },
  {
    tableName: 'moneda',
    timestamps: true, 
  }
);


module.exports = Moneda;