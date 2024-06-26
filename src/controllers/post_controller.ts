import BaseController from "./base_controller";
import Post from "../models/post_model";
import { IPost } from "../models/post_model";
import { Request, Response } from "express";

class PostController extends BaseController<IPost> {
    constructor() {
        super(Post);
    }
    async post(req: Request, res: Response) {
        console.log("I got here");
        const { post, user } = req.body;
        console.log(req.body);
        post.owner = user._id;
        req.body = post;
        return super.post(req, res);
    }
}

export default new PostController();
