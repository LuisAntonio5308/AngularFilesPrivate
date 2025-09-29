const express = require("express");
const path = require("path");
const jwt = require("jsonwebtoken"); // para tokens
const cors = require("cors");

const app = express();
const PORT = 3000;

/*app.use(cors({
  origin: "http://localhost:4200", // tu frontend
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type, Authorization"
}));*/

app.use(cors());

// Middleware para validar token
function authMiddleware(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: "No autorizado" });

  try {
    const decoded = jwt.verify(token.split(" ")[1], "SECRETO123");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token inválido" });
  }
}

// Ruta pública de prueba
app.get("/api/publico", (req, res) => {
  res.json({ message: "Cualquiera puede ver esto" });
});

// Ruta privada para servir archivos
app.get("/api/archivo/:nombre", authMiddleware, (req, res) => {
  const filePath = path.join(__dirname, "private", req.params.nombre);
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).json({ message: "Archivo no encontrado" });
    }
  });
});

// Crear token de prueba
app.get("/api/login", (req, res) => {
  const token = jwt.sign({ usuario: "admin", rol: "admin" }, "SECRETO123", { expiresIn: "1h" });
  res.json({ token });
});

app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
