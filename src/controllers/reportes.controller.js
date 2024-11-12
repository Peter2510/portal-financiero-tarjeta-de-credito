const TarjetaCredito = require('../models/tarjeta_credito.models');

const contarTarjetas = async (req,res) => {
    try {
        const totalTarjetas = await TarjetaCredito.count();
        console.log(`Total de tarjetas: ${totalTarjetas}`);
        return res.json({totalTarjetas: totalTarjetas});
    } catch (error) {
        console.error('Error al contar las tarjetas:', error);
    }
}


module.exports = {
    contarTarjetas
}
