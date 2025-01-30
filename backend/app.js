import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import progressRoutes from "./routes/progress.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

// Conectar ao banco de dados e iniciar o servidor
const startServer = async () => {
  try {
    await connectDB(); // Conecta ao banco de dados

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (err) {
    console.error("Falha ao iniciar o servidor:", err.message);
  }
};

// Rotas
app.use("/api/progress", progressRoutes);

// Middleware de erro global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Algo deu errado!" });
});

startServer();
