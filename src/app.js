const express = require('express');
const app = express();
const cors = require('cors');
cookieParser = require('cookie-parser');
//require('./models/asociaciones');
//const { swaggerUi, swaggerDocs } = require('./swagger.js');

//Routes
const authRoutes = require('./routes/auth.routes');
const rolRoutes = require('./routes/rol.routes');
const monedaRoutes = require('./routes/moneda.routes');
const motivoEliminacionRoutes = require('./routes/motivo_eliminacion.routes');
const motivoBloqueoRoutes = require('./routes/motivo_bloqueo.routes');
const configuracionRoutes = require('./routes/configuracion.routes');


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: process.env.ORIGIN , credentials:true}));

//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//use routes
app.use(authRoutes);
app.use(rolRoutes);
app.use(monedaRoutes);
app.use(motivoEliminacionRoutes);
app.use(motivoBloqueoRoutes);
app.use(configuracionRoutes);

app.get('/',(req,res)=>{
    res.send('Hello from Backend API')
});




module.exports = app;