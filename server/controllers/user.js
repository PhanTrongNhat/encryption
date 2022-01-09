import { userModel } from "../models/users.model.js";
import { encrypt_RSA, decrypt_RSA } from "../components/RSA.js";
import bigInt from "big-integer";
import { dirname } from "path";
import { fileURLToPath } from "url";
export const user = async (req, res) => {
  try {
    const data = req.body;

    const checkExist = await userModel.find({ username: data.username });

    if (checkExist[0]._id) {
      const post = await userModel.findOneAndUpdate(
        { username: data.user },

        {
          $push: { user: data.username },
        },
        {
          new: true,
        }
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
export const getImageAnotherUser = async (req, res) => {
  try {
    const data = req.query;
    let array = [];
  
    const checkExist = await userModel.findOne({ username: data.username });

    if (checkExist) {
      for (let i = 0; i < checkExist.user.length; i++) {
        let temp = await userModel.findOne({ username: checkExist.user[i] });
    
       let temp1 = decrypt_RSA(
         bigInt(temp.RSAencodeKey),
         bigInt(process.env.RSA_PRIVATE_KEY),
         bigInt(process.env.RSA_N)
       );

             let temp2 = encrypt_RSA(
               bigInt(temp1.toString()),
               bigInt(checkExist.RSAPublicKey),
               bigInt(checkExist.n)
             );
        
       array.push({
         RSAencodeKey: temp2.toString(),
         user: temp.username,
         images: temp.images,
         n: checkExist.n,
       });
      }
        res.status(200).send(array);
    }else{
         res.status(401).send("no data!");
    }
  

    //    if (checkExist[0]._id) {
    //      const post = await userModel.findOneAndUpdate(
    //        { username: data.username },

    //        {
    //          $push: { user: data.user },
    //        },
    //        {
    //          new: true,
    //        }
    //      );
    //      //   console.log(post);
    //      res.status(200).send("upload success!");
    //    } else {
    //      res.status(404).send("user not found!");
    //    }
  } catch (error) {

    res.status(401).send(error);
  }
};
