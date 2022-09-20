import { connect } from "./../database/database"
import bcrypt from "bcrypt"
import generateJWT from "../helpers/jwt"

const login = async (req, res) => {
    /**
     * En el login enviamos el usuario y contraseña
     * Este lo usamos de prueba, segun los ejercicios dados en clase
     * El endpoint que maneja es: localhost:3000/authUser
     * Los archivos y metodos:
     * auth.controller.js, auth.routes.js, jwt.js (genera el token)
     */
    try{
        const connection = await connect

        const { user, pass } = req.body
        
        const result = await connection.query('SELECT * FROM users WHERE user = ?', user)
        
        //Comparamos las contraseñas encriptadas
        //Devuelve un valor booleano =>
        const validPass = await bcrypt.compare(pass, result[0].pass)

        if(!validPass){
            return res.status(404).json({
                ok: false,
                error: 'Contraseña incorrecta'
            })
        } else {
            //Si existe el user, generamos el token
            const token = await generateJWT(result[0].id)
            return res.status(200).json({
                ok: true,
                token
            })
        }
    } catch (err){
        return res.status(404).json({
            ok: false,
            error: 'Something goes wrong'
        })
    }
}

export const methods = { login } 