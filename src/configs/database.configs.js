const { Sequelize } = require('sequelize');
require('dotenv').config();

const host = process.env.DATABASE_HOST;
const port = process.env.DATABASE_PORT;
const database = process.env.DATABASE_NAME;
const user = process.env.DATABASE_USER;
const password = process.env.DATABASE_PASSWORD;

const sequelize = new Sequelize(database, user, password, {
  host: host,
  port: port,
  dialect: 'mysql'
});

async function connect() {
  try {
    await sequelize.authenticate();
    console.log('Conexión establecida exitosamente con la base de datos: ' + database);
  } catch (error) {
    console.error('Error de conexión:', error);
  }
}

module.exports = { connect, sequelize };