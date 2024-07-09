import User from "../models/user_model";
import BaseController from "./base_controller";
import { IUser } from "../models/user_model";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

class UserController extends BaseController<IUser> {
    constructor() {
        super(User);
    }

    async getById(req: Request, res: Response) {
        const res2 = await super.getById(req, res);
        if (res2 && Array.isArray(res2)) {
            res2.forEach((user: IUser, index: number) => {
                delete res2[index].password;
            });
        }
        return res2;
    }

    async put(req: Request, res: Response) {
        try {
            console.log(req.body, "This is the request");
            const { connectedUser, password } = req.body;

            if (password) {
                const salt = await bcrypt.genSalt(10);
                connectedUser.password = await bcrypt.hash(password, salt);
            }

            const { _id, ...updatedFields } = connectedUser;
            if (_id) {
                delete updatedFields._id;
            }
            console.log(updatedFields, "These are updated fields");
            const updatedUser = await User.findOneAndUpdate(
                { _id: req.body.connectedUser._id },
                updatedFields,
                {
                    new: true, // Return the updated document
                }
            );
            if (updatedUser) {
                res.status(200).send(updatedUser);
            } else {
                console.log("User not found");
                res.status(404).send("User not found");
            }
        } catch (error) {
            console.log(error);
            res.status(400).send(error.message);
        }
    }
}

export default new UserController();
