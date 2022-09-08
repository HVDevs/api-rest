import express from "express"
import morgan from "morgan"
//Rutas
import productRoutes from "./routes/product.routes"

/*express framework que nos permite crear un servidor web
y manejar nuestras rutas a través de peticiones http:
get, post, put y delete
*/
const app = express()

//Configuraciones
//Asignamos el puerto sobre el cual queremos trabajar
app.set("port", 3000)
//Este se encarga de transformar el body en un json
app.use(express.json())

//Middle wares
/**
Los middle wares son funciones intermedias que se ejecutaran entre una
petición y una respuesta
*/
//Indicamos a traves de un middle ware que usaremos morgan
app.use(morgan("dev"))

//Le indicamos la ruta de nuestros productos
app.use(productRoutes)

export default app