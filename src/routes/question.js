import express from "express";
import {POST_QUESTION, GET_QUESTIONS, DELETE_QUESTION} from "../controllers/question.js";
import auth from "../middlewares/auth.js"

const router = express.Router();

router.post("/questions", auth, POST_QUESTION )
router.get("/questions", GET_QUESTIONS )
router.delete("/questions/:id", auth, DELETE_QUESTION )

export default router