import express from "express";
import { user, getImageAnotherUser } from "../controllers/user.js";
import auth from "../middlewares/auth.middleware.js" 
var router = express.Router();

// define the home page route
router.post("/",auth, user);
router.get("/",auth, getImageAnotherUser);

export default router;
