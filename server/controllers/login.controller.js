import { userModel } from "../models/users.model.js";
//import { carts } from "../models/order.model.js";
import jwt from "jsonwebtoken";
import md5 from "md5";
import dotenv from "dotenv";
dotenv.config();
const refreshTokens = [];
export const postInform = async (req, res) => {
  try {
    const data = req.body;
    if (data) {
      // tim kiem du lieu de xac minh tai khoan
      const user = await userModel.findOne({ username: data.username }).exec();
 
      if (user && user.password === md5(data.password)) {
     
            // const accessToken = jwt.sign(
            //   {
            //     username: data.username,
            //     publickey: process.env.RSA_PUBLIC_KEY,
            //     n: process.env.RSA_N,
            //   },
            //   process.env.ACCESS_SECRET_KEY,
            //   {
            //     expiresIn: "1000s",
            //   }
            // );
        res.status(200).send({
          username: user.username,
          publickey: process.env.RSA_PUBLIC_KEY,
          n: process.env.RSA_N,
          // accessToken:accessToken 
        });
      
      } else {
        res.status(500).send("login error!");
      }
    } else {
      res.status(500).send("login error!");
    }
  } catch (error) {
    res.status(500).send(error, "login error!");
  }
};
