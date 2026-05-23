import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
dotenv.config();

const app = express();

//Import packages
import route from "./route/route.js";
import "./config/db.js";

app.use(cors({
    origin:"https://jsshopmm.onrender.com",
    credentials:true
}));

app.use(session({
    secret:"secretkey",
    resave:false,
    saveUninitialized:false,
    cookie:{
        secure:true,
        sameSite:"none"
    }
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api", route); //API routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}.`);
})
