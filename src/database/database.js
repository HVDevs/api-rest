//Configuramos la conexion a la base de datos
import mysql from "promise-mysql"
import config from "../config"

const connection = mysql.createConnection({
    host: config.host,
    port: config.port,
    database: config.database,
    user: config.user,
    password: config.password
})

const getConnection = () => {
    return connection
}

export const connect = getConnection()