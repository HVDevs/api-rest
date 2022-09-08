import { config } from "dotenv";

config()

//Tomamos los datos en el archivo .env (se crea para no subir informacion sensible)
export default{
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD
}