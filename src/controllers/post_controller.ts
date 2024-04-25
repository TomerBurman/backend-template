import BaseController from "./base_controller";
import Post from "../models/post_model";
import { IPost } from "../models/post_model";

class PostController extends BaseController<IPost> {
    constructor() {
        super(Post);
    }
}

export default new PostController();
