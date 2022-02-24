import express from "express";
import { getimages } from "../controllers/getImage.js";
import auth from "../middlewares/auth.middleware.js"; 
var router = express.Router();

// define the home page route
router.get("/", getimages);

export default router;
