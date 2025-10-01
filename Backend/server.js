const express=require('express');
const dotenv=require('dotenv');

dotenv.config();
const PORT=process.env.PORT || 3000;
const app=express();


app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});