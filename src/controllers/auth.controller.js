import { connect } from "./../database/database"
import bcrypt from "bcrypt"
import generateJWT from "../helpers/jwt"

const login = async (req, res) => {
    /**
     * En el login enviamos el usuario y contraseña
     */
    try{
        const connection = await connect
        const { user, pass } = req.body
        const result = await connection.query('SELECT id, pass FROM users WHERE user == ?', user)
        console.log(result[0])
        //Comparamos las contraseñas encriptadas
        const validPass = await bcrypt.compare(pass, result[0].pass)

        if(!validPass){
            return res.status(404).json({
                ok: false,
                error: 'Contraseña incorrecta'
            })
        }

        //Si existe el user, generamos el token
        const token = await generateJWT(result[0].id)
        res.status(200).json({
            ok: true,
            token
        })
    } catch (err){
        
    }
}

export const methods = { login } 