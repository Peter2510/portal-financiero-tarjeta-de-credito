const Moneda = require('./moneda.models');
const Rol = require('./rol.models');
const TipoTarjeta = require('./tipo_tarjeta.models');
const Usuario = require('./usuario.models');
const Tarjeta = require('./tarjeta_credito.models');
const BloqueoTarjeta = require('./bloqueo_tarjeta.models');
const MotivoBloqueo = require('./motivo_bloqueo.models');
const EliminacionTarjeta = require('./eliminacion_tarjeta.models');
const MotivoEliminacion = require('./motivo_eliminacion.models');
const TarjetaCredito = require('./tarjeta_credito.models');



Rol.hasMany(Usuario, {
    foreignKey: 'id_rol', sourceKey: 'id', as: 'usuarios'
});


Usuario.belongsTo(Rol, {
    foreignKey: 'id_rol', targetKey: 'id', as: 'rol'
});

Moneda.hasMany(TipoTarjeta, {
    foreignKey: 'id_moneda', sourceKey: 'id', as: 'tipo_tarjetas'
});

TipoTarjeta.belongsTo(Moneda, {
    foreignKey: 'id_moneda', targetKey: 'id', as: 'moneda'
});


Tarjeta.belongsTo(TipoTarjeta, { foreignKey: 'id_tipo_tarjeta', as: 'tipoTarjeta' });
TipoTarjeta.hasMany(Tarjeta, { foreignKey: 'id_tipo_tarjeta', as: 'tarjetas' });

BloqueoTarjeta.belongsTo(Tarjeta, { foreignKey: 'id_tarjeta', as: 'tarjeta' });

BloqueoTarjeta.belongsTo(MotivoBloqueo, { foreignKey: 'id_motivo', as: 'motivoBloqueo' });

Tarjeta.hasMany(BloqueoTarjeta, { foreignKey: 'id_tarjeta', as: 'bloqueos' });

MotivoBloqueo.hasMany(BloqueoTarjeta, { foreignKey: 'id_motivo', as: 'bloqueos' });

// Asociaciones
TarjetaCredito.hasMany(EliminacionTarjeta, {
    foreignKey: 'id_tarjeta',
    as: 'eliminaciones'
});

// Asociaciones
EliminacionTarjeta.belongsTo(TarjetaCredito, {
    foreignKey: 'id_tarjeta',
    as: 'tarjeta'
});
EliminacionTarjeta.belongsTo(MotivoEliminacion, {
    foreignKey: 'id_motivo_eliminacion',
    as: 'motivoEliminacion'
});

// Asociación
MotivoEliminacion.hasMany(EliminacionTarjeta, {
    foreignKey: 'id_motivo_eliminacion',
    as: 'eliminaciones'
});


