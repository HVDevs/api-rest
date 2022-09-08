//En este archivo manejamos las rutas dedicadas a nuestros productos
import { Router } from "express";
//Importamos los metodos
import { methods as productController } from "../controllers/product.controller";

//Creamos un enrutador para manejar las rutas
const router = Router()

//Definimos la ruta que dara respuesta a una peticion GET
router.get("/products", productController.getProducts)
//Definimos la ruta que dara respuesta a una peticion POST
router.post("/add", productController.newProduct)
//Definimos la ruta que dara respuesta a una peticion DELETE
router.delete("/delete/:id", productController.deleteProduct)
//Definimos la ruta que dara respuesta a una peticion UPDATE
router.put("/update/:id", productController.updateProduct)

export default router