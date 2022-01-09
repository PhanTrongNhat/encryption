// import { itemModel } from "../models/product.model.js";

// export const getItems = async (req, res) => {
//   try {
//     let data;
//     if (req.query._id) {
//       data = await itemModel.findOne({ _id: req.query._id });
//     } else {
//       data = await itemModel.find();
//     }

//     if (req.query.page) {
//       data = data.slice(req.query.page * 3, req.query.page * 3 + 3);
//     }
//     //console.log(data)
//     res.status(200).send(data);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("err");
//   }
// };

// export const createItems = async (req, res) => {
//   try {
//     const data = req.body;
//     console.log(typeof data);
//     const post = new itemModel(data);
//     console.log(await post.save());
//     res.status(200).send(data);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("err");
//   }
// };
// export const updateItems = async (req, res) => {
//   try {
//     const data = req.body;
//     const post = await itemModel.findOneAndUpdate({ _id: data._id }, data, {
//       new: true,
//     });
//     res.status(200).send(post);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("err");
//   }
// };
// export const commentItems = async (req, res) => {
//   try {
//     let data = req.body;
//     if(data.content){
//       console.log( data);
//       const date = new Date();
//       data.date = date;
//        const result = await itemModel.findOneAndUpdate(
//          { _id: data._id },
//          {
//            $push: { comments: data},
//          } ,{ upsert: true }
//        );
//        res.status(200).send(result);
//     }
//  res.status(401).send("not comment!");
//   } catch (error) {
//     res.status(401);
//   }
// };
