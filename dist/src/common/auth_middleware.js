"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    console.log("Auth middle");
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
        return res.status(401).send("Missing token");
    }
    jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(401).send("invalid token");
        }
        console.log(req.body.user);
        req.body.user = user;
        next();
    });
};
exports.default = authMiddleware;
//# sourceMappingURL=auth_middleware.js.map