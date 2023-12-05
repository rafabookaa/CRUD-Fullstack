import express from "express";
import { addChamado, deleteChamado, getChamados,  updateChamado } from "../controllers/chamados.js";


const router = express.Router();

router.get("/", getChamados);
router.post("/", addChamado);
router.put("/:id", updateChamado);
router.delete("/:id", deleteChamado);

export default router;