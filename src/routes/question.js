import express from "express";
import {POST_QUESTION, GET_QUESTIONS, GET_BY_ID, DELETE_QUESTION} from "../controllers/question.js";
import auth from "../middlewares/auth.js"

const router = express.Router();

router.post("/questions", auth, POST_QUESTION )
router.get("/questions", GET_QUESTIONS )
router.get("/questions/:id", GET_BY_ID)
router.delete("/questions/:id", auth, DELETE_QUESTION )

export default router