import jwt from "jsonwebtoken";
const Auth = (req,res,next)=>{
  try {
      const authorizationHeader = req.headers["authorization"];
      console.log(authorizationHeader);
      const token = authorizationHeader.split(" ")[1];
      console.log(token);

      if (!token) return res.sendStatus(401);
      jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err, data) => {
       
        if (err) {
          console.log(err);
          return res.status(403).send(err);
        }
      
      });
        next();
  } catch (err) {
     return res.status(404).send(err);
  }
  
   
}
export default Auth;