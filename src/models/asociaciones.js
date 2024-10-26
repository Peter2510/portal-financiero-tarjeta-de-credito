const configuracion = require('./configuracion.models');
const entidadProveedor = require('./entidad_proveedor.models');
const moneda = require('./moneda.models');
const motivoBloqueo = require('./motivo_bloqueo.models');
const motivoEliminacion = require('./motivo_eliminacion.models');
const Rol = require('./rol.models');
const tipoMovimiento = require('./tipo_movimiento.models');
const Usuario = require('./usuario.models');

Rol.hasMany(Usuario, {
    foreignKey: 'id_rol', sourceKey: 'id', as: 'usuarios'
});


Usuario.belongsTo(Rol, { 
    foreignKey: 'id_rol', targetKey: 'id', as: 'rol'
});