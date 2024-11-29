import { dbclient } from "../db.js";


const getProduct = async()=>{
    try{
        const result = await dbclient.query('select * from products');
        console.log(result);
        return result
    } catch(error){
        console.error('Error', error);
        console.log(error.message);
    } finally{
        await dbclient.close();
    }
}

const crearProducto = async(body)=>{
    try{
        const ingreso = await dbclient.query('insert into products (name, description, price, category_id, stock) VALUES(?,?,?,?,?)',
            [body.name, body.description, body.price, body.category_id, body.stock])
        return {status:201}
    }catch(error){
        return error.message;
    }
    finally{
        await dbclient.close();
    }
}

const actualizarProducto = async(id, body)=>{
    try{
        const actualizar = await dbclient.query('UPDATE products SET name = ?, description = ?, price = ?, category_id = ? , stock = ? WHERE id = ?',
            [body.name, body.description, body.price, body.category_id, body.stock, id]);
        return{status:200}
    }catch(error){
        return error.message;
    }finally{
        await dbclient.close();
    }
}

const borrarproducto = async(id)=>{
    try{
        const borrarproducto = await dbclient.query('DELETE FROM products WHERE id = ?',[id]);
        return{status:202}
    }catch(error){
        return error.message;
    }finally{
        await dbclient.close();
    }
}


export {getProduct, crearProducto, actualizarProducto, borrarproducto};