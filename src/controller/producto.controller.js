import { dbclient } from "../db.js";

// Obtener productos
export const getProduct = async (req, res) => {
    let conn;
    try {
        conn = await dbclient.getConnection();
        const query = `
            SELECT products.*, categories.name AS category_name
            FROM products
            INNER JOIN categories ON products.category_id = categories.id
        `;
        const result = await conn.query(query);

        // Convertir imágenes BLOB a base64
        const productsWithImages = result.map(product => {
            if (product.image) {
                product.image = product.image.toString('base64');
            }
            return product;
        });

        return res.json(productsWithImages);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        return res.status(500).json({ message: 'Error al obtener productos', error: error.message });
    } finally {
        if (conn) conn.release();
    }
};

// Crear producto
export const crearProducto = async (req, res) => {
    const { name, description, price, category_id, stock, image } = req.body;
    let conn;
    try {
        conn = await dbclient.getConnection();
        const query = `
            INSERT INTO products (name, description, price, category_id, stock, image)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const values = [
            name,
            description,
            price,
            category_id,
            stock,
            image ? Buffer.from(image, 'base64') : null
        ];

        const result = await conn.query(query, values);

        // Asegúrate de convertir el ID de `BigInt` a string o número.
        const insertId = typeof result.insertId === 'bigint' ? result.insertId.toString() : result.insertId;

        return res.status(201).json({ message: 'Producto creado exitosamente', id: insertId });
    } catch (error) {
        console.error('Error al crear producto:', error);
        return res.status(500).json({ message: 'Error al crear producto', error: error.message });
    } finally {
        if (conn) conn.release();
    }
};

// Actualizar producto
export const actualizarProducto = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, category_id, stock, image } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'El ID del producto es obligatorio.' });
    }

    let conn;
    try {
        conn = await dbclient.getConnection();
        const query = `
            UPDATE products
            SET name = ?, description = ?, price = ?, category_id = ?, stock = ?, image = ?
            WHERE id = ?
        `;
        const values = [
            name,
            description,
            price,
            category_id,
            stock,
            image ? Buffer.from(image, 'base64') : null,
            id
        ];

        const result = await conn.query(query, values);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Producto no encontrado.' });
        }

        return res.status(200).json({ message: 'Producto actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        return res.status(500).json({ message: 'Error al actualizar producto', error: error.message });
    } finally {
        if (conn) conn.release();
    }
};

// Borrar producto
export const borrarProducto = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'El ID del producto es obligatorio.' });
    }

    let conn;
    try {
        conn = await dbclient.getConnection();
        const query = 'DELETE FROM products WHERE id = ?';

        const result = await conn.query(query, [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Producto no encontrado.' });
        }

        return res.status(200).json({ message: 'Producto borrado exitosamente' });
    } catch (error) {
        console.error('Error al borrar producto:', error);
        return res.status(500).json({ message: 'Error al borrar producto', error: error.message });
    } finally {
        if (conn) conn.release();
    }
};
