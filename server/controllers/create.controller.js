import { userModel } from "../models/users.model.js";
//import { orders } from "../models/order.model.js";
import md5 from "md5";
import dotenv from "dotenv";
dotenv.config();

export const postCreate = async (req, res) => {
  try {
  
    let data = req.body;
    const checkExist = await userModel.find({"username":data.username});
    if (checkExist.length) {
      res.status(300).send("user exist!");
    } else if (data.username && data.password) {
      data.password = md5(data.password);
      const post = new userModel(data);
      await post.save();
        const accessToken = jwt.sign({
          username: data.username,
          publickey: process.env.RSA_PUBLIC_KEY,
          n: process.env.RSA_N,}, process.env.ACCESS_SECRET_KEY, {
          expiresIn: "1000s",
        });
      res
        .status(200)
        .send({
          username: data.username,
          publickey: process.env.RSA_PUBLIC_KEY,
          n: process.env.RSA_N,
          accessToken: accessToken,
        });
    } else {
      res.status(500).send("no data");
    }
  } catch (err) {
  
    res.status(500).send("err");
  }
};
