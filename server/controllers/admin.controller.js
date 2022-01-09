// // import { itemModel } from "../models/product.model.js";
// import { userModel } from "../models/user.model.js";
// import md5 from 'md5';
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// dotenv.config();
// const refreshTokens = [];

// export const getProducts = async (req, res) => {
//   try {
//     let data;

//     let _page = req.query._page || 1;
//     const _limit = req.query._limit || 5;

//     if (req.query._id) {
//       data = await itemModel.findOne({ _id: req.query._id });
//     } else {
//       data = await itemModel.find();
//     }

//     _page--;
//     data = data.slice(_page * _limit, _page * _limit + _limit);
//     const _totalRows = await itemModel.countDocuments();

//     res.status(200).send({ data, _totalRows });
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("err");
//   }
// };
// export const getUsers = async (req, res) => {
//   try {
//     let data;
//     console.log("admin");
//     data = await userModel.find();
//     res.status(200).send(data);
//   } catch (error) {
//     console.log(err);
//     res.status(500).send("err");
//   }
// };
// export const updateProduct = async (req, res) => {
//   try {
//     const data = req.body;
//     await itemModel.findOneAndUpdate(
//       { _id: data._id },
//       {
//         name: data.name,
//         cost: data.cost,
//       }
//     );

//     res.status(200).send("done");
//   } catch (error) {
//     console.log(error);
//     res.status(401).send(error);
//   }
// };
// export const deleteProduct = async (req, res) => {
//   try {
//     const data = req.body;
//     console.log(data);
//     await itemModel.findOneAndDelete({ _id: data._id });

//     res.status(200).send("done");
//   } catch (error) {
//     console.log(error);
//     res.status(401).send(error);
//   }
// };
// export const addProduct = async (req, res) => {
//   try {
//     console.log(req.body);
//     const data = req.body;
//     const post = new itemModel(data);
//     await post.save();
//     res.status(200).send("done");
//   } catch (error) {}
// };
// export const login = async (req, res) => {
//   try {

//     const data = req.body;
//     const user = await userModel.findOne({ username: data.username });
//     console.log(user);
//     if (md5(data.password) === user.password && user.isAdmin) {
//       console.log("password correct");
//       const accessToken = jwt.sign(data, process.env.ACCESS_SECRET_KEY_ADMIN, {
//         expiresIn: "100s",
//       });
//       const refreshToken = jwt.sign(data, process.env.REFRESH_SECRET_KEY_ADMIN);
//       refreshTokens.push(refreshToken);
//       res.status(200).send({
//         _id: user._id,
//         username: user.username,

//         token: accessToken,
//       });
//     }else{
//       res.status(400).send('password incorrect!')
//     }
//     // const data = req.body;
//     // const post = new itemModel(data);
//     // await post.save();
   
//   } catch (error) {
//     res.status(404).send('not found!')
//   }
// };
