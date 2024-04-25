import express, { Express } from "express";
const app = express();
import StudentRoute from "./routes/student_route";
//const postRoute = require("./routes/post_route");
import postRoute from "./routes/post_route";
import authRoute from "./routes/auth_route";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import bodyParser from "body-parser";

// const mongoose = require("mongoose");

//const bodyParser = require("body-parser");

const initApp = () => {
    const promise = new Promise<Express>((resolve, reject) => {
        try {
            const db = mongoose.connection;
            db.on("error", (err) => console.log(err));
            db.once("open", () => console.log("Database connected"));
            mongoose.connect(process.env.DATABASE_URL).then(() => {
                app.use(bodyParser.json());
                app.use(bodyParser.urlencoded({ extended: true }));
                app.use("/student", StudentRoute);
                app.use("/post", postRoute);
                app.use("/auth", authRoute);
                resolve(app);
            });
        } catch (error) {
            console.log(error.message);
            reject();
        }
    });
    return promise;
};
export default initApp;
