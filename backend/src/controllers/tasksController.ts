import { Router } from "express";
import { createTask, deleteTask, getTaskById, getTasks, updateTask } from "../services/taskService";

const router = Router();

router.get("/", (req, res) => getTasks(req, res));
router.get("/:id", (req, res) => getTaskById(req, res));
router.post("/", (req, res) => createTask(req, res));
router.delete("/:id", (req, res) => deleteTask(req, res));
router.put("/:id", (req, res) => updateTask(req, res));


export default router;