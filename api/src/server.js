const express = require("express");

const app = express();
const PORT = 3000;

app.get("/", (request, response) => {
response.json({
mensaje: "API de despliegue Docker funcionando"
});
});

app.get("/health", (request, response) => {
response.json({
estado: "ok"
});
});

app.listen(PORT, () => {
console.log(`API ejecutándose en http://localhost:${PORT}`);
});
