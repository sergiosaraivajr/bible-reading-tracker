import { Schema, model } from "mongoose";

const ProgressSchema = new Schema({
  userId: { type: String, required: true, unique: true }, // Identificador único do usuário
  userName: { type: String, required: true }, // Nome do usuário
  totalChaptersRead: { type: Number, required: true }, // Total de capítulos lidos
  totalChapters: { type: Number, required: true }, // Total de capítulos da Bíblia
  percentageRead: { type: Number, required: true }, // Porcentagem de progresso
  lastUpdated: { type: Date, default: Date.now }, // Data da última atualização
});

export default model("Progress", ProgressSchema);
