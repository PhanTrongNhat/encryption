import { userModel } from "../models/users.model.js";
//import { orders } from "../models/order.model.js";
import md5 from "md5";
import dotenv from "dotenv";
dotenv.config();

export const getimages = async (req, res) => {
  try {
    let data = req.query;

    if (!data.username) {
      res.status(500).send("no data");
    }
    const checkExist = await userModel.findOne({ username: data.username });
    
    if (checkExist) {
      res.status(200).send(checkExist.images);
    } else {
      res.status(500).send("no data");
    }
  } catch (err) {
  
    res.status(500).send("err");
  }
};
