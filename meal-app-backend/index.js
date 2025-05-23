const express = require("express");
const mongoose = require("mongoose");
const usersRouter = require("./Routes/usersRouter");
const recipeRouter = require("./Routes/recipeRouter");
const dotenv = require("dotenv");
const cors = require("cors")
const cookieParser = require("cookie-parser");

const app = express();
dotenv.config();

const allowedOrigins = [
  'https://newmealapp.netlify.app',
  'https://6830f0d4dd6bf83a3db5a52d--newmealapp.netlify.app'
];


//Bu arada body-parser(yani express.json()) disardan post islemleri icin gerekli
// app.use(cors({
//     origin: "https://6830f0d4dd6bf83a3db5a52d--newmealapp.netlify.app", // ✅ Update this to match your frontend URL
//     credentials: true  // ✅ Allow sending cookies
// }));

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json()); //siralama önemli önce body-parser daha sonra userRouter express.json()' in icinde body-parser var görevi de post islemleri icin gerekli
app.use(cookieParser()); //tokenlari require ile cekerken buna ihtiyacimiz var
app.use(usersRouter);
app.use(recipeRouter);


app.get("/",async(req,res)=>{
    res.json("App is on the foots");
})

mongoose.connect(process.env.URI).then(() => {
    app.listen(3000, () => {
        console.log("App is running on port 3000");
    });
}).catch((error) => {
    console.log({ error });
});
