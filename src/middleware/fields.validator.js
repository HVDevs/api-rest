//En este archivo validamos los campos requeridos.
//next sirve para, si las validaciones fueron OK, continua con el codigo.
const { response, request } = require('express')
const { validationResult } = require('express-validator')

const fieldValidator = (req = request, res = response, next) =>{
    
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            error: errors.mapped()
        })
    }

    //Si no colocamos es next() se cuelga porque no continua con el codigo
    next()

}

export const methods = {
    fieldValidator
}