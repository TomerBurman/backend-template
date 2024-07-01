import express, { Express } from "express";
const app = express();
import UserRoute from "./routes/user_route";
//const postRoute = require("./routes/post_route");
import postRoute from "./routes/post_route";
import authRoute from "./routes/auth_route";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import bodyParser from "body-parser";
import fileRoute from "./routes/file_routes";

const initApp = () => {
    const promise = new Promise<Express>((resolve, reject) => {
        try {
            const db = mongoose.connection;
            db.on("error", (err) => console.log(err));
            db.once("open", () => console.log("Database connected"));
            mongoose.connect(process.env.DATABASE_URL).then(() => {
                app.use(bodyParser.json());
                app.use(bodyParser.urlencoded({ extended: true }));
                app.use("/uploads", express.static("uploads"));
                app.use("/user", UserRoute);
                app.use("/post", postRoute);
                app.use("/auth", authRoute);
                app.use("/file", fileRoute);
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
