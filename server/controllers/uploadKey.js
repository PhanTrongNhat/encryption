import { userModel } from "../models/users.model.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
export const upKey = async (req, res) => {
  try {
    const data = req.body;
    const checkExist = await userModel.find({ username: data.username });

    if (checkExist[0]._id) {
      const post = await userModel.findOneAndUpdate(
        { username: data.username },

        { RSAencodeKey: data.RSAencodeKey },
        { upsert: true, new: true }
      );
      //   console.log(post);
      res.status(200).send("upload success!");
    } else {
      res.status(404).send("user not found!");
    }
  } catch (error) {

    res.status(401).send(error);
  }
};
