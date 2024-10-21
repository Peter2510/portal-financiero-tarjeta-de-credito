const {connect} = require("./configs/database.configs");
const { sequelize } = require('./configs/database.configs');
const app = require('./app');
require('dotenv').config();
connect();

const PORT = process.env.APP_PORT || 3200;

sequelize.sync( 
 )
  .then(() => {
    console.log('Tablas sincronizadas con la base de datos.');
  })
  .catch(error => console.log('Error al sincronizar la base de datos:', error));

app.listen(PORT, ()=>{
    console.log(`Servidor iniciado en el puerto ${PORT}`);
})