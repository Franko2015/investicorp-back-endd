import express from "express";
import { getCategoria, crearCategoria, actualizarCategoria, borrarCategoria } from "../controller/categoria.controller.js";

const router = express.Router();

router.get("/categories", async (req, res) => {
    try {
        const data = await getCategoria(req, res);
        return res.json(data);
    } catch (error) {
        console.error('Error al obtener categorías:', error);
        return res.status(500).json({ message: 'Error al obtener categorías', error: error.message });
    }
});

router.post("/categories", async (req, res) => {
    try {
        const data = await crearCategoria(req, res);
        return res.status(201).json({ message: "Categoría creada exitosamente" });
    } catch (error) {
        console.error('Error al crear categoría:', error);
        return res.status(500).json({ message: 'Error al crear categoría', error: error.message });
    }
});

router.put("/categories/:id", async (req, res) => {
    try {
        const data = await actualizarCategoria(req, res);
        return res.status(200).json({ message: "Categoría actualizada exitosamente" });
    } catch (error) {
        console.error('Error al actualizar categoría:', error);
        return res.status(500).json({ message: 'Error al actualizar categoría', error: error.message });
    }
});

router.delete("/categories/:id", async (req, res) => {
    try {
        const data = await borrarCategoria(req, res);
        return res.status(200).json({ message: "Categoría borrada exitosamente" });
    } catch (error) {
        console.error('Error al borrar categoría:', error);
        return res.status(500).json({ message: 'Error al borrar categoría', error: error.message });
    }
});

export const categories = router;