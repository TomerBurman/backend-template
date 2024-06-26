"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user_model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    if (email === null || password === null) {
        res.status(400).send("invalid details");
    }
    try {
        const user = yield user_model_1.default.findOne({ email: email });
        if (user) {
            return res.status(400).send("User already exists");
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        const newUser = yield user_model_1.default.create({
            email: email,
            password: hashedPassword,
        });
        return res.status(200).send(newUser);
    }
    catch (err) {
        return res.status(400).send(err.message);
    }
});
const generateToken = (userId) => {
    const accessToken = jsonwebtoken_1.default.sign({
        _id: userId,
        jti: (0, uuid_1.v4)(),
    }, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRATION });
    const refreshToken = jsonwebtoken_1.default.sign({
        _id: userId,
        jti: (0, uuid_1.v4)(),
    }, process.env.REFRESH_TOKEN_SECRET);
    return { accessToken, refreshToken };
};
/**
 * searches for the user details in the database and creates an access token
 * and a refresh token, saves the refresh token in the database and returns the access token aswell as the refresh token
 * @param req
 * @param res
 * @returns response of access token and refresh token
 */
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    try {
        const user = yield user_model_1.default.findOne({ email: email });
        if (user === null) {
            return res.status(401).send("Incorrect email or password");
        }
        const valid = yield bcrypt_1.default.compare(password, user.password);
        if (!valid) {
            return res.status(401).send("Invalid email or password");
        }
        const { accessToken, refreshToken } = generateToken(user._id.toString());
        if (user.tokens == null) {
            user.tokens = [refreshToken];
        }
        else {
            user.tokens.push(refreshToken);
        }
        yield user.save();
        console.log("User has been logged in successfully");
        return res.status(200).send({
            accessToken: accessToken,
            refreshToken: refreshToken,
            name: user.name,
        });
    }
    catch (err) {
        console.log(err);
        return res.status(400).send(err.message);
    }
});
const logout = (req, res) => {
    res.status(400).send("Logout");
    console.log("Logout");
};
const refresh = (req, res) => {
    //extract token from http header
    const authHeader = req.headers["authorization"];
    const origRefreshToken = authHeader && authHeader.split(" ")[1];
    if (origRefreshToken == null) {
        return res.status(401).send("Missing token");
    }
    // verify token
    jsonwebtoken_1.default.verify(origRefreshToken, process.env.REFRESH_TOKEN_SECRET, (err, userInfo) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.status(401).send("invalid token");
        }
        try {
            const user = yield user_model_1.default.findById(userInfo._id);
            if (user == null ||
                user.tokens == null ||
                !user.tokens.includes(origRefreshToken)) {
                if (user.tokens != null) {
                    user.tokens = [];
                    yield user.save();
                }
                return res.status(401).send("Invalid token");
            }
            // generate new access token and refresh token
            const { accessToken, refreshToken } = generateToken(user._id.toString());
            // save the refresh token in the database
            user.tokens = user.tokens.filter((token) => token != refreshToken);
            user.tokens.push(refreshToken);
            // return the new access token and new refresh token
            return res.status(200).send({
                accessToken: accessToken,
                refreshToken: refreshToken,
            });
        }
        catch (err) {
            console.log(err);
            res.status(403).send(err.message);
        }
    }));
};
exports.default = { register, login, logout, refresh };
//# sourceMappingURL=auth_controller.js.map