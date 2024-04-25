"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getPost = (req, res) => {
    res.send("post get");
};
const getPostById = (req, res) => {
    res.send("post get by id ");
};
const postPost = (req, res) => {
    res.send("post post");
};
const updatePost = (req, res) => {
    res.send("post put");
};
const updatePostById = (req, res) => {
    res.send("post put by id");
};
const deletePost = (req, res) => {
    res.send("post delete by id");
};
const deletePostById = (req, res) => {
    res.send("post delete by id");
};
exports.default = {
    getPost,
    postPost,
    updatePost,
    deletePost,
    updatePostById,
    deletePostById,
    getPostById,
};
//# sourceMappingURL=post_controller.js.map