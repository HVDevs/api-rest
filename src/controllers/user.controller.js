//Aqui almacenamos la logica para las peticiones GET POST DELETE PUT
import { connect } from "./../database/database"
//Uso para crear usuarios
import bcrypt from "bcrypt"

//Nos logeamos
const login = async (req, res) => {
    const user = req.body.user
    const pass = req.body.pass

    let passwordHash = await bcrypt.hash(pass, 8)

    try {
        if(user && pass){
            const connection = await connect

            const result = await connection.query('SELECT * FROM users WHERE user = ?', [user], 
            async(error, results) => {
                if(results.length == 0 || !(await bcrypt.compare(pass, results[0].pass))){
                    res.render('login', {
                        alert: true,
                        alertTitle: 'Error',
                        alertMessage: '¡Usuario y/o contraseña incorrecta!',
                        alertIcon: 'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'login' //La ruta donde se direcciona
                    })
                } else {
                    req.session.loggedin = true //Estado logeado
                    req.session.name = results[0].name //Obtenemos el nombre del usuario
                    res.render('login', {
                        alert: true,
                        alertTitle: 'Conexion exitosa',
                        alertMessage: '¡LOGIN CORRECTO!',
                        alertIcon: 'success',
                        showConfirmButton: false,
                        timer: 1500,
                        ruta: '' //La ruta donde se direcciona
                    })
                }
                res.end()
            })
        } else {
            res.render('login', {
                alert: true,
                alertTitle: 'Advertencia',
                alertMessage: '¡Por favor ingrese el usuario y la contraseña!',
                alertIcon: 'warning',
                showConfirmButton: true,
                timer: false,
                ruta: 'login' //La ruta donde se direcciona
            })
        }
    } catch(error){

    }
}

//Nos registramos
const register = async(req, res) =>{
    const user = req.body.user
    const name = req.body.name
    const rol = req.body.rol
    const pass = req.body.pass

    //Creamos una contraseña encriptada
    let passwordHash = await bcrypt.hash(pass, 8)

    try {
        const connection = await connect

        const result = await connection.query('INSERT INTO users SET ?', { user: user, name: name, rol: rol, pass: passwordHash })

        //Al crearse el usuario, muestra un mensaje de alerta
        res.render('register', {
            alert: true,
            alertTitle: 'Registration',
            alertMessage: '¡Successful Registration',
            alertIcon: 'success',
            showConfirmButton: false,
            timer: 1500,
            ruta: 'login' //La ruta donde se direcciona
        })
    } catch(error){
        res.status(400).json({
            ok: false,
            error,
            message: 'Something gone wrong'
        })
    }
    
}

//Auth
const auth = (req, res) => {
    if (req.session.loggedin){
        res.render('index', {
            login: true,
            name: req.session.name
        })
    } else {
        res.render('index', {
            login:false,
            name: 'Debe iniciar sesion'
        })
    }
}
export const methods = { register, login, auth }