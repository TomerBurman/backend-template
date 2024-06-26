import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log("Auth middle");
    const authHeader = req.headers["authorization"];
    console.log(req.headers);
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
        return res.status(401).send("Missing token");
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(401).send("invalid token");
        }
        console.log(req.body.user);
        req.body.user = user;
        next();
    });
};

export default authMiddleware;
