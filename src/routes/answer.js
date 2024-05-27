import express from "express";
import auth from "../middlewares/auth.js";
import {GET_ANSWER, POST_ANSWER, DELETE_ANSWER, LIKE_ANSWER, DISLIKE_ANSWER} from "../controllers/answer.js"

const router = express.Router()

router.get("/question/:id/answers", GET_ANSWER)
router.post("/question/:id/answer", auth, POST_ANSWER)
router.delete("/answer/:id", auth, DELETE_ANSWER)

router.post("/answer/like", auth, LIKE_ANSWER);
router.post("/answer/dislike", auth, DISLIKE_ANSWER);

export default router