import express from "express";
import {getProduct, crearProducto, actualizarProducto, borrarproducto} from "../producto/services.js";

const router = express.Router();

router.get("/getproduct", async(req, res)=>{
    const data = await getProduct();
    return res.json(data)
});

router.post("/crearproducto", async(req,res)=>{
    const body= await req.body;
    const data = await crearProducto(body);
    if (data.status == 201){
        return res.json({
            message:"se ha creado el producto exitosamente"
        })
    }
    return res.json(data)

})

router.put("/actualizar/:id", async(req, res)=>{
    const actid = await req.params.id;
    const body = await req.body;
    const data = await actualizarProducto(actid, body);
    console.log(actid);
    if (data.status == 200){
        return res.json({
            message:"se ha actualizado el producto exitosamente"
        })
    }
})

router.delete("/borrarproducto/:id", async(req, res)=>{
    const delid= await req.params.id;
    const data= await borrarproducto(delid);
    console.log(delid)
    if (data.status == 202){
        return res.json({
            message:"el producto ha sido borrado"
        })
    }
})

export default router;