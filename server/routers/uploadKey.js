import express from "express";
import { upKey } from "../controllers/uploadKey.js";
import auth from "../middlewares/auth.middleware.js"; 
var router = express.Router();

// define the home page route
router.post("/",auth, upKey);

export default router;
