import { getProduct, crearProducto, actualizarProducto, borrarProducto } from "../controller/producto.controller.js";
import express from "express";

const router = express.Router();

router.get("/products", getProduct);

router.post("/products", crearProducto);

router.put("/products/:id", actualizarProducto);

router.delete("/products/:id", borrarProducto);

export const products = router;