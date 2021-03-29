const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./View/userRoutes")
const productRoutes = require("./View/productRoutes")
// require("dotenv").config();
require("dotenv").config({ path : "./config.env"    });
const path = require("path")

const app = express();

const port = process.env.PORT ;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
mongoose
  .connect( process.env.MONGO_URI , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("DB CONNECTED");
  }).catch(err => {console.log(err)} )

  app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.get("/" , (req,res) => {
    res.send("Workinggg")
} )

app.use("/api",userRoutes)
app.use("/api",productRoutes)
if(process.env.NODE_ENV  === "production"){
  console.log("CALLEDD")
  app.use(express.static(  path.join ( __dirname, "client/build")));
   app.get("*",(req,res) => {
  res.sendFile(path.resolve(__dirname,"client" , "build" , "index.html"  ))
} )
}else{
app.get("/" , (req,res) => {
 res.send("Workinggg")
} )
}


app.listen( port , () => {  console.log(`Port started running on ${port}`)});