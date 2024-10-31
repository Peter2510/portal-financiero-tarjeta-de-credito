const express = require('express');
const app = express();
const cors = require('cors');
cookieParser = require('cookie-parser');
require('./models/asociaciones');
//const { swaggerUi, swaggerDocs } = require('./swagger.js');

//Routes
const authRoutes = require('./routes/auth.routes');
const rolRoutes = require('./routes/rol.routes');
const monedaRoutes = require('./routes/moneda.routes');
const motivoEliminacionRoutes = require('./routes/motivo_eliminacion.routes');
const motivoBloqueoRoutes = require('./routes/motivo_bloqueo.routes');
const configuracionRoutes = require('./routes/configuracion.routes');
const tipoMovimientoRoutes = require('./routes/tipo_movimiento.routes');
const entidadProveedorRoutes = require('./routes/entidad_proveedor.routes');
const usuarioRoutes = require('./routes/usuario.routes');
const usuarioWebServiceRoutes = require('./routes/usuario_web_service.routes');
const tipoTarjetaRoutes = require('./routes/tipo_tarjeta.routes');
const movimientoRoutes = require('./routes/movimientos.routes');
const tarjetaCreditoRoutes = require('./routes/tarjeta_credito.routes');
const comentarioRoutes = require('./routes/comentarios.routes');
const reportesRoutes = require('./routes/reportes.routes');

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
app.use(tipoMovimientoRoutes);
app.use(entidadProveedorRoutes);
app.use(usuarioRoutes);
app.use(usuarioWebServiceRoutes);
app.use(tipoTarjetaRoutes);
app.use(movimientoRoutes);
app.use(tarjetaCreditoRoutes);
app.use(comentarioRoutes);
app.use(reportesRoutes);    

app.get('/',(req,res)=>{
    res.send('Hello from Backend API')
});




module.exports = app;