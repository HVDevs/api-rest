import express from "express"
import morgan from "morgan"
//Rutas
import productRoutes from "./routes/product.routes" //Productos
import userRoutes from "./routes/user.routes" //Usuarios
import authRoutes from "./routes/auth.routes" //Usuarios

/*express framework que nos permite crear un servidor web
y manejar nuestras rutas a través de peticiones http:
get, post, put y delete
*/
const app = express()

//Configuraciones
//Asignamos el puerto sobre el cual queremos trabajar
app.set("port", 3000)
//Este se encarga de transformar el body en un json
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//Middle wares
/**
Los middle wares son funciones intermedias que se ejecutaran entre una
petición y una respuesta
*/
//Indicamos a traves de un middle ware que usaremos morgan
app.use(morgan("dev"))

//El directorio del public
app.use('/resources', express.static('public'))
app.use('/resources', express.static(__dirname + '/public'))

//Establecemos el motor de plantillas ejs
app.set('view engine', 'ejs')

//sessions
const session = require('express-session')
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

//Le indicamos la ruta de nuestros productos y los usuarios
app.use(productRoutes, userRoutes, authRoutes)

export default app