import express from "express";
import { postInform} from "../controllers/login.controller.js";
var router = express.Router();

// define the home page route
router.post("/", postInform);


export default router;
