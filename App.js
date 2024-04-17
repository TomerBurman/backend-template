const express = require("express");
const app = express();

const dotenv = require("dotenv").config();
const port = process.env.PORT
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection
db.on("error", (err) => console.log(err));
db.once("open", (err) => console.log("Database connected successfully"));


const StudentRoute = require("./routes/student_route");
const postRoute = require("./routes/post_route");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/student", StudentRoute);
app.use("/post", postRoute);
app.listen(port, () => {
    console.log(`listening on port http://localhost:${port}`);
})
