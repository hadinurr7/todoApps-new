import express from "express";
import { assignTodoController, createTodoController, editTodoController, updateStatusController } from "../controllers/todo.controllers";
import { verifyToken } from "../middleware/jwt";


const router = express.Router();


router.post("/todos",verifyToken, createTodoController);
router.patch("/:id", verifyToken, editTodoController);
router.patch("/:id/status", verifyToken, updateStatusController);
router.patch("/:id/assign", verifyToken, assignTodoController);

export default router;
