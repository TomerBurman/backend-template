const express = require("express");
const app = express();
const StudentRoute = require("./routes/student_route");
const postRoute = require("./routes/post_route");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


const initApp = () => {
    const promise = new Promise(async (resolve, reject) => {
        try{
            const db = mongoose.connection
            db.on("error", (err) => console.log(err));
            db.once("open", () => console.log("Database connected"));
            await mongoose.connect(process.env.DATABASE_URL);
            app.use(bodyParser.json()); 
            app.use(bodyParser.urlencoded({ extended: true }));
            app.use("/student", StudentRoute);
            app.use("/post", postRoute);
            resolve(app);
        }catch(error){
            console.log(error.message);
            reject();
        }
    })
    return promise;
}




module.exports = initApp
