// config.js
import express from 'express';
const app = express();
import morgan from 'morgan';
import cors from 'cors';

import { products } from "./routes/producto.routes.js";
import { categories } from "./routes/categoria.routes.js";

app.use(cors());

// Vistas en json
// Vistas en json
app.use(express.json());

app.use("/api/", products);
app.use("/api/", categories);

// * Configuraciones del servidor
app.set("port", 3000);

app.set("server", "localhost");
app.set("json spaces", 2);

//! middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//* starting the server
app.listen(app.get("port"), () => {
    console.log(`
        Servidor: ${app.get("server")}
        Puerto: ${app.get("port")}
        URL: http://${app.get("server") + ':' + app.get("port")}/api/`);
});
export default app;