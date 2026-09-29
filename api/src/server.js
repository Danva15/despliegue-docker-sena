const express = require("express");
const pool = require("./db");

const app = express();
const PORT = 3000;

app.get("/", (request, response) => {
response.json({
mensaje: "API de despliegue Docker funcionando"
});
});

app.get("/health", async (request, response) => {
try {
await pool.query("SELECT 1");


response.json({
  estado: "ok",
  base_datos: "ok"
});


} catch (error) {
console.error("Error de conexión con PostgreSQL:", error);


response.status(500).json({
  estado: "error",
  base_datos: "error"
});


}
});

app.listen(PORT, () => {
console.log(`API ejecutándose en http://localhost:${PORT}`);
});
