import express from'express';
 import  Connection  from './database/db.js';
 import dotenv from "dotenv";
 import router from './routes/route.js';
 import cors from 'cors';
import bodyParser from 'body-parser';

 dotenv.config();
const app=express();

app.use(cors());
app.use(express.json());
//app.use(bodyParser.json({extended :true}))
// app.use(bodyParser.urlencoded({extended : true}))
app.use(express.urlencoded({ extended: true }));
app.use('/',router);

const port=8080;
const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;

Connection(USERNAME,PASSWORD);
app.listen(port,()=>console.log("Server is running hellooooo shally"));

