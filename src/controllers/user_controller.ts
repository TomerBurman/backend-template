import User from "../models/user_model";
import BaseController from "./base_controller";
import { IUser } from "../models/user_model";
import { Request, Response } from "express";

//const userController = new BaseController<IUser>(User);

class userController extends BaseController<IUser> {
    constructor() {
        super(User);
    }
    async getById(req: Request, res: Response) {
        console.log("I got here");
        const res2 = await super.getById(req, res);
        if (res2 && Array.isArray(res2)) {
            res2.forEach((user: IUser, index: number) => {
                delete res2[index].password;
            });
        }
        return res2;
    }
}

export default new userController();
