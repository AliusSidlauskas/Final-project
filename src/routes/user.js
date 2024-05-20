import express from "express";
import {CREATE_USER, LOGIN_USER} from "../controllers/user.js";

const router = express.Router();

router.post("/users", CREATE_USER)
router.post("/users/login", LOGIN_USER)

export default router;
