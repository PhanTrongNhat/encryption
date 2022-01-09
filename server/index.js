import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import createUser from "./routers/create.router.js";
import getimage from "./routers/getImage.js"
// import routerproducts from './routers/products.router.js';
import routerLogin from "./routers/login.js";
// import routerOrder from './routers/order.js'
// import routerAdmin from './routers/admin.router.js'
import uploadRouter from "./routers/uploadImages.js";
import { PythonShell } from "python-shell";
import uploadKey from "./routers/uploadKey.js"
import user from "./routers/user.js"
const URI = process.env.URI_MONGODB;
 

const app = express();

const port = process.env.port || 5005;
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));

app.use(cors());

app.use("/signin", createUser);
// app.use('/products',routerproducts);
app.use("/login", routerLogin);
app.use("/getimages", getimage);
app.use("/uploadkey", uploadKey);
app.use("/user", user);
// app.use('/order',routerOrder);
// app.use('/admin',routerAdmin);
app.get("/", (req, res) => {
  res.send("hello world");
});
app.use("/uploadImage", uploadRouter);
// router.render = (req, res) => {
//     const header = res.getHeaders();
//     const totalCountHeader = header["x-total-count"];
//     if (totalCountHeader && req.method === "GET") {
//       const queryParams = queryString.parse(req._parsedUrl.query);
//       console.log(queryParams);
//       res.jsonp({
//         data: res.locals.data,
//         pagination: {
//           _limit: Number.parseInt(queryParams._limit) || 10,
//           _page: Number.parseInt(queryParams._page) || 1,
//           _totalRows: Number.parseInt(totalCountHeader),
//         },
//       });
//     }

//     res.jsonp(res.locals.data);
//   };
// import './ws.js'
app.get("/name", (req, res) => {
  console.log(req.query);
  var options = {
    mode: "text",
    pythonPath: "G:MaHoa/project/server/",

    args: [req.query.firstname, req.query.lastname],
  };
  PythonShell.runString("x=1+1;print(x)", null, function (err) {
    if (err) throw err;
    console.log("finished");
  });
  // PythonShell.run('process.py', options, function (err, data) {
  //   if (err) res.send(err);
  //   console.log(data.toString());

  //   res.send(data.toString());
  // });
});

app.use(express.static("public"));
mongoose.set("useNewUrlParser", true);
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connect to DB!");
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
