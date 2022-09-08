//Este archivo se encarga de correr nuestra funcion principal
import app from "./app"

//Nuestra funcion principal, donde configuramos nuestro servidor
const main = () =>{
    app.listen(app.get("port"))
    console.log(`Server on port ${app.get("port")}`);
}

main()