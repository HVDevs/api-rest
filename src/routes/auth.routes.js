//En este archivo manejamos las rutas dedicadas a nuestros productos
import { Router } from "express";
import { methods as authMethods } from "./../controllers/auth.controller"

const router = Router()

router.post('/auth', authMethods.login)

export default router