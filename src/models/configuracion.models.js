const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/database.configs');

const Configuracion = sequelize.define(
  'Configuracion',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    tipo:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    valor:{
        type: DataTypes.DECIMAL(5,2),
        allowNull: false
    }
  },
  {
    tableName: 'configuracion',
    timestamps: true, 
  }
);


module.exports = Configuracion;