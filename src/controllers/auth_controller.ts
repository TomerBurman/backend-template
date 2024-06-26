import { Request, Response } from "express";
import User from "../models/user_model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 } from "uuid";

const register = async (req: Request, res: Response) => {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    if (email === null || password === null) {
        res.status(400).send("invalid details");
    }
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).send("User already exists");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({
            email: email,
            password: hashedPassword,
            name: req.body.name,
            bio: req.body.bio,
        });
        return res.status(200).send(newUser);
    } catch (err) {
        return res.status(400).send(err.message);
    }
};

const generateToken = (
    userId: string
): { accessToken: string; refreshToken: string } => {
    const accessToken = jwt.sign(
        {
            _id: userId,
            jti: v4(),
        },
        process.env.TOKEN_SECRET,
        { expiresIn: process.env.TOKEN_EXPIRATION }
    );
    const refreshToken = jwt.sign(
        {
            _id: userId,
            jti: v4(),
        },
        process.env.REFRESH_TOKEN_SECRET
    );
    return { accessToken, refreshToken };
};
/**
 * searches for the user details in the database and creates an access token
 * and a refresh token, saves the refresh token in the database and returns the access token aswell as the refresh token
 * @param req
 * @param res
 * @returns response of access token and refresh token
 */
const login = async (req: Request, res: Response) => {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    try {
        const user = await User.findOne({ email: email });
        if (user === null) {
            return res.status(401).send("Incorrect email or password");
        }
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res.status(401).send("Invalid email or password");
        }
        const { accessToken, refreshToken } = generateToken(
            user._id.toString()
        );
        if (user.tokens == null) {
            user.tokens = [refreshToken];
        } else {
            user.tokens.push(refreshToken);
        }
        await user.save();
        console.log("User has been logged in successfully");
        return res.status(200).send({
            accessToken: accessToken,
            refreshToken: refreshToken,
            name: user.name,
            userId: user._id,
        });
    } catch (err) {
        console.log(err);
        return res.status(400).send(err.message);
    }
};
const logout = (req: Request, res: Response) => {
    res.status(400).send("Logout");
    console.log("Logout");
};

const refresh = (req: Request, res: Response) => {
    //extract token from http header
    const authHeader = req.headers["authorization"];
    const origRefreshToken = authHeader && authHeader.split(" ")[1];
    if (origRefreshToken == null) {
        return res.status(401).send("Missing token");
    }
    // verify token
    jwt.verify(
        origRefreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, userInfo: { _id: string; jti: string }) => {
            if (err) {
                return res.status(401).send("invalid token");
            }
            try {
                const user = await User.findById(userInfo._id);
                if (
                    user == null ||
                    user.tokens == null ||
                    !user.tokens.includes(origRefreshToken)
                ) {
                    if (user.tokens != null) {
                        user.tokens = [];
                        await user.save();
                    }
                    return res.status(401).send("Invalid token");
                }
                // generate new access token and refresh token
                const { accessToken, refreshToken } = generateToken(
                    user._id.toString()
                );
                // save the refresh token in the database
                user.tokens = user.tokens.filter(
                    (token) => token != refreshToken
                );
                user.tokens.push(refreshToken);
                // return the new access token and new refresh token
                return res.status(200).send({
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                });
            } catch (err) {
                console.log(err);
                res.status(403).send(err.message);
            }
        }
    );
};

export default { register, login, logout, refresh };
