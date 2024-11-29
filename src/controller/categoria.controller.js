import { dbclient } from "../db.js";

export const getCategoria = async (req, res) => {
    let conn;
    try {
        conn = await dbclient.getConnection();
        const query = 'SELECT * FROM categories';
        const result = await conn.query(query);
        return result;
    } catch (error) {
        console.error('Error al obtener categorías:', error);
        throw new Error('Error al obtener categorías');
    } finally {
        if (conn) conn.release();
    }
}

export const crearCategoria = async (req, res) => {
    const { name } = req.body;
    let conn;
    try {
        conn = await dbclient.getConnection();
        const query = 'INSERT INTO categories (name) VALUES (?)';
        await conn.query(query, [name]);
        return { status: 201 };
    } catch (error) {
        console.error('Error al crear categoría:', error);
        throw new Error('Error al crear categoría');
    } finally {
        if (conn) conn.release();
    }
}

export const actualizarCategoria = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    let conn;
    try {
        conn = await dbclient.getConnection();
        const query = 'UPDATE categories SET name = ? WHERE id = ?';
        await conn.query(query, [name, id]);
        return { status: 200 };
    } catch (error) {
        console.error('Error al actualizar categoría:', error);
        throw new Error('Error al actualizar categoría');
    } finally {
        if (conn) conn.release();
    }
}

export const borrarCategoria = async (req, res) => {
    const { id } = req.params;
    let conn;
    try {
        conn = await dbclient.getConnection();
        const query = 'DELETE FROM categories WHERE id = ?';
        await conn.query(query, [id]);
        return { status: 200 };
    } catch (error) {
        console.error('Error al borrar categoría:', error);
        throw new Error('Error al borrar categoría');
    } finally {
        if (conn) conn.release();
    }
}