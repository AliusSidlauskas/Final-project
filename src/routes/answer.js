import express from "express";
import auth from "../middlewares/auth.js";
import {GET_ANSWER, POST_ANSWER, DELETE_ANSWER} from "../controllers/answer.js"

const router = express.Router()

router.get("/question/:id/answers", GET_ANSWER)
router.post("/question/:id/answer", auth, POST_ANSWER)
router.delete("/answer/:id", auth, DELETE_ANSWER)

export default router