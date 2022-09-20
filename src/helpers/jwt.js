//JWT sirve para la verificacion de los usuarios.
//No debemos poner informacion sensible en el Token, porque puede ser robado y manipulado.
//Creamos funciones que llamamos de ciertos lados, no son middleware
//Instalamos la dependencia jsonwebtoken

//Generamos el JsonWebToken (cada vez que hacemos un login)
import { jwt } from 'jsonwebtoken'

//Obtenemos el uid del usuario para generar el token
const generateJWT = () => {
    return new Promise((resolve, rejected) => {
        //El token esta dividido en 3 partes, header, cuerpo y firma
        //El payload contendra la info del usuario
        const payload = {
            uid
        }
        //Traemos la firma para crear el token desde el .env
        jwt.sign(payload, process.env.JWT_SECRET), {
            expiresIn: '12hs' //En cuanto expira el token
        } (err, token => {
            if(err){
                console.log(err);
                rejected('No se pudo crear el token')
            }
            else {
                resolve(token)
            }
        })
    })
}

export default generateJWT