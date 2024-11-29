import bodyParser from "body-parser";
import express from "express";
import router from "./routes/producto.routes.js";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use("/", router);

app.listen(port, () => {
    console.log("servidor corriendo correctamente");
});


export default app;