const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/database.configs');

const Rol = sequelize.define(
  'Rol',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    nombre:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
  },
  {
    tableName: 'rol',
    timestamps: true, 
  }
);


module.exports = Rol;