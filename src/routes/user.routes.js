//En este archivo manejamos las rutas dedicadas a nuestros productos
import { Router } from "express";
import { methods, methods as userMethods } from "../controllers/user.controller";
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
router.post('/register', userMethods.register)

//LogOut
router.get('/logout', (req, res) => {
    req.session.destroy(()=>{
        res.redirect('/')
    })
})



export default router