const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/database.configs');

const MotivoBloqueo = sequelize.define(
  'MotivoBloqueo',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    motivo:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
  },
  {
    tableName: 'motivo_bloqueo',
    timestamps: true, 
  }
);


module.exports = MotivoBloqueo;