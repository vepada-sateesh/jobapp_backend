const express = require("express");
const { userRoute } = require("./Routes/User.route");

const { connection } = require("./Config/db");
const jwt = require("jsonwebtoken");
require("dotenv").config();
var cors = require("cors");
let app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
const chekadmin = (req, res, next) => {
    
};
app.use("/user", userRoute);
app.get("/", (req, res) => {
  res.send("welcone to mock13");
});

const auth = (req, res, next) => {
  let token = req.headers.authorization;
  if (token) {
    try {
      var decoded = jwt.verify(token, "secret");
      //console.log(decoded)
      if (decoded) {
        req.body.userID = decoded.userID;
        next();
      }
    } catch (error) {
      res.send({ data: "please login" });
    }
  } else {
    res.send({ data: "please login now" });
  }
};
app.use(auth);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("connection established at port", 8080);
  } catch (error) {
    console.log(error.message);
  }
});
