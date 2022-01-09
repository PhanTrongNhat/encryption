import express from "express";
import { postCreate } from "../controllers/create.controller.js";
var router = express.Router();

// define the home page route
router.post("/",  postCreate);


export default router;
