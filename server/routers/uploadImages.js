import express from "express";
import multer from "multer";
import { upImage } from "../controllers/uploadImage.js";
import auth from "../middlewares/auth.middleware.js"; 
const upload = multer({ dest: "./public/uploads" });
var router = express.Router();
// router.get("/", function (req, res) {
//   res.send("Birds home page");
// });
router.post("/", upload.single("image"),upImage);
export default router;
