import express from "express";
const router = express.Router();
import { Request, Response } from "express";
import multer from "multer";

const base = "http://192.168.0.107:3000/";
const storage = multer.diskStorage({
    destination: function (req: Request, file: unknown, cb) {
        console.log("multer storage callback1");
        cb(null, "uploads/");
    },
    filename: function (req: Request, file: unknown, cb) {
        console.log("multer storage callback2");
        cb(null, Date.now() + ".jpg"); //Appending .jpg
    },
});
const upload = multer({ storage: storage });

router.post(
    "/file",
    upload.single("file"),
    function (req: Request, res: Response) {
        console.log("router.post(/file: " + base + req.file.path);
        res.status(200).send({ url: base + req.file.path });
    }
);

export = router;
