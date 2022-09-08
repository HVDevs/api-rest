//Aqui almacenamos la logica para las peticiones GET POST DELETE PUT
import { connect } from "./../database/database"

const getProducts = async(req, res) => {
    try{

        const connection = await connect

        //La consulta SQL
        const result = await connection.query('SELECT * FROM producto')

        res.status(200).json({
            ok: true,
            result,
            message: 'Res status, all OK'
        })

    } catch(error) {

        res.status(500).json({
            ok: false,
            error,
            message: 'Something gone wrong'
        })

    }

}

const newProduct = async(req, res) => {

    //Obtenemos del body (request) la informacion (un json)
    const { id_producto, nombre, costo, precio, cantidad } = req.body

    //Creamos el producto
    const product = { id_producto, nombre, costo, precio, cantidad }

    try{

        const connection = await connect

        //Realizamos la consulta en SQL
        const result = await connection.query('INSERT INTO producto SET ?', product)

        res.status(200).json({
            ok: true,
            product,
            result,
            message: 'All OK'
        })

    } catch(error) {

        res.status(500).json({
            ok: false,
            error,
            message: 'Something gone wrong'
        })

    }

}

const deleteProduct = async(req, res) => {
    //Obtenemos el ID del producto desde los parametros enviados por la WEB (en este caso POSTMAN)
    const id_producto = req.params.id

    console.log(id_producto);
    try {

        const connection = await connect

        const result = await connection.query('DELETE FROM producto WHERE id_producto = ?', id_producto)

        return res.status(200).json({
            ok: true,
            result,
            message: 'All OK'
        })
    } catch(error) {

        return res.status(500).json({
            ok:false,
            error,
            message: 'Something gone wrong'
        })
    }
    
}

const updateProduct = async(req, res) => {

    //Obtenemos como parametro el ID del producto a modificar
    const id_producto = req.params.id

    //Del body obtenemos los valores a actualizar
    const { nombre, costo, precio, cantidad } = req.body

    //Creamos el objeto con los datos
    const product = {
        id_producto,
        nombre,
        costo,
        precio,
        cantidad
    }

    //Los pasamos a la consulta SQL
    try {

        console.log(product, id_producto);
        const connection = await connect

        const result = await connection.query('UPDATE producto SET ? WHERE id_producto = ?', [product, id_producto])

        return res.status(200).json({
            ok: true,
            result,
            message: 'All OK'
        })

    } catch(error) {

        return res.status(500).json({
            ok: false,
            error,
            message: 'Something gone wrong'
        })
    }
}

export const methods = { getProducts, newProduct, deleteProduct, updateProduct }