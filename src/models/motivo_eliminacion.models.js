const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/database.configs');

const MotivoEliminacion = sequelize.define(
  'MotivoEliminacion',
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
    tableName: 'motivo_eliminacion',
    timestamps: true, 
  }
);


module.exports = MotivoEliminacion;