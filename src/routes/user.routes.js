//En este archivo manejamos las rutas dedicadas a nuestros productos
import { Router } from "express";
import { check } from "express-validator";
import { methods, methods as userMethods } from "../controllers/user.controller";
import { methods as fieldValidator } from "../middleware/fields.validator";
//Creamos un enrutador para manejar las rutas
const router = Router()

//Rederizamos la plantilla de las vistas
router.get('/', methods.auth)

//Renderizamos la pagina de login
router.get('/login', (req, res) => {
    res.render('login')
})
router.post('/auth', methods.login)

//Rederizamos la pagina de registro
router.get('/register', (req, res) => {
    res.render('register')
})
//La ruta para guardar el usuario
//Usamos la validacion de los datos requeridos.
//Si los campos estan vacios muestra:
//{"ok":false,"error":{"email":{"msg":"Invalid value","param":"email","location":"body"},"name":{"value":"","msg":"Invalid value","param":"name","location":"body"}}}
router.post('/register', [ 
    check('user', 'El email es invalido').isEmail(), 
    check('name', 'El nombre es requerido').not().isEmpty(),
    fieldValidator.fieldValidator ], 
    userMethods.register)

//LogOut
router.get('/logout', (req, res) => {
    req.session.destroy(()=>{
        res.redirect('/')
    })
})



export default router