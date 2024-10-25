const jwt = require('jsonwebtoken');
require('dotenv').config();

const validacionJWTAdmin = (req, res, next) => {  

    if (!req.headers.authorization) return res.status(401).json({ ok: false, mensaje: 'Token no proporcionado' });

    //Bearer token
    const token = req.headers.authorization.split(' ')[1];

    //console.log("llego a descomprimir", token);

    if(!token || token === '') return res.status(401).json({ ok: false, mensaje: 'Token no  proporcionado' });

    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if(err) return res.status(403).json({ ok: false, mensaje: 'Token no válido' });

        if (decoded.idTipoUsuario !== 1 && decoded.idTipoUsuario !== 3) {
            return res.status(403).json({ ok: false, mensaje: 'No tienes permisos de admin para realizar esta acción' });
        }

        next();
    });

}

const validacionJWTCliente = (req, res, next) => {

    if (!req.headers.authorization) return res.status(401).json({ ok: false, mensaje: 'Token no proporcionado' });

    //Bearer token
    const token = req.headers.authorization.split(' ')[1];

    if(!token || token === '') return res.status(401).json({ ok: false, mensaje: 'Token no proporcionado' });

    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if(err) return res.status(403).json({ ok: false, mensaje: 'Token no válido' });

        if(decoded.idTipoUsuario !== 2) return res.status(403).json({ ok: false, mensaje: 'No tienes permisos de cliente para realizar esta acción' });

        next();
    });

}

const validacionJWTGeneral = (req, res, next) => {

    if (!req.headers.authorization) return res.status(401).json({ ok: false, mensaje: 'Token no proporcionado' });

    //Bearer token
    const token = req.headers.authorization.split(' ')[1];

    if(!token || token === '') return res.status(401).json({ ok: false, mensaje: 'Token no  proporcionado' });

    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if(err) return res.status(403).json({ ok: false, mensaje: 'Token no válido' });

        next();
    });

}


module.exports = { validacionJWTAdmin, validacionJWTCliente, validacionJWTGeneral };