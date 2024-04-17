const getPost = (req, res, next) => {
    res.send("post get");
}
const getPostById = (req, res, next) => {
    res.send("post get by id ");
}
const postPost = (req, res, next) => {
    res.send("post post");
}
const updatePost = (req, res, next) => {
    res.send("post put");
}
const updatePostById = (req, res, next) => {
    res.send("post put by id");
}
const deletePost = (req, res, next) => {
    res.send("post delete by id");
}
const deletePostById = (req, res, next) => {
    res.send("post delete by id");
}

module.exports = {getPost, postPost, updatePost, deletePost, updatePostById, deletePostById, getPostById }