import { Router } from "express";
import { body, validationResult } from "express-validator";
import Progress from "../models/Progress.js";

const router = Router();

// Rota para salvar ou atualizar o progresso
router.post(
  "/save",
  [
    body("userId").notEmpty().withMessage("userId é obrigatório"),
    body("userName").notEmpty().withMessage("userName é obrigatório"),
    body("totalChaptersRead")
      .isNumeric()
      .withMessage("totalChaptersRead deve ser um número"),
    body("totalChapters")
      .isNumeric()
      .withMessage("totalChapters deve ser um número"),
    body("percentageRead")
      .isNumeric()
      .withMessage("percentageRead deve ser um número"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      userId,
      userName,
      totalChaptersRead,
      totalChapters,
      percentageRead,
    } = req.body;

    try {
      let progress = await Progress.findOne({ userId });
      if (progress) {
        // Atualiza o progresso existente
        progress.totalChaptersRead = totalChaptersRead;
        progress.totalChapters = totalChapters;
        progress.percentageRead = percentageRead;
        progress.lastUpdated = Date.now();
      } else {
        // Cria um novo progresso
        progress = new Progress({
          userId,
          userName,
          totalChaptersRead,
          totalChapters,
          percentageRead,
        });
      }
      await progress.save();
      res.status(200).json({ message: "Progresso salvo com sucesso!" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao salvar o progresso" });
    }
  }
);

// Rota para obter o ranking de progresso (somente para o admin)
router.get("/ranking", async (req, res) => {
  try {
    const ranking = await Progress.find().sort({ percentageRead: -1 });
    res.status(200).json(ranking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao obter o ranking" });
  }
});

export default router;
