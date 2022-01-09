import { userModel } from "../models/users.model.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
export const upImage = async (req, res) => {
  try {
    // console.log(JSON.parse(req.body.document));
    const data = JSON.parse(req.body.document);
    const checkExist = await userModel.find({ username: data.username });
  
if (checkExist[0]._id) {
    const result = await userModel.findOneAndUpdate(
      { _id: checkExist[0]._id },
      {
        $push: {
          images:{linkImage: req.file.path.split("\\").slice(1).join("\\"),
          nameImage: data.imageName}
        },
      },
      { upsert: true, new: true }
    );
    res.status(200).send("upload success!");
}else{
  res.status(404).send("user not found!");
}
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// console.log(__dirname.split("controllers").join("\\"));
// res.sendFile("G:/MaHoa/project/server" +"/public/" + req.file.path.split("\\").slice(1).join("\\"));

   
     
      //  const fd = new FormData();
      //  fd.append("image", image.selectedFile, image.selectedFile.name);
       //   res.sendFile("/public/" + req.file.path.split("\\").slice(1).join("\\"), {
       //     root: '.'
       //   });
      //  res.send(req.file.path.split("\\").slice(1).join("\\"));
  //   const data = req.body;
  //   await userModel.findOneAndUpdate(
  //     { _id: data._id },
  //     {
  //       name: data.name,
  //       cost: data.cost,
  //     }
  //   );

  //   res.status(200).send("done");
  } catch (error) {
  
    res.status(401).send(error);
  }
};
