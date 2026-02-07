import { Router } from "express";
import { createField, getFields, deleteField } from "../controllers/fieldController";

const router = Router();

router.post("/", createField);    
router.get("/", getFields);        
router.delete("/:id", deleteField);

export default router;
