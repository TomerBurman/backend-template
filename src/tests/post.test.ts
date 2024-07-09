import request from "supertest";
import appInit from "../App";
import mongoose from "mongoose";
import { Express } from "express";
import Post from "../models/post_model";
import User from "../models/user_model";

let app: Express;

const user = {
    email: "tome55an@gmail.com",
    password: "12345",
    name: "Test User",
    bio: "This is a test user",
    image: "test_image.png",
};

const post = {
    title: "Test Post",
    ingredients: ["ingredient1", "ingredient2"],
    description: "This is a test description",
    steps: ["step1", "step2"],
    images: ["image1.png", "image2.png"],
    ownerName: "Test User",
    savedUsers: [],
};

let accessToken = "";
let postId = "";

beforeAll(async () => {
    app = await appInit();
    console.log("beforeAll");
    await User.deleteMany({ email: user.email });
    await Post.deleteMany({ title: post.title });

    // Register and login the user to get the access token
    await request(app).post("/auth/register").send(user);
    const res = await request(app).post("/auth/login").send(user);
    accessToken = res.body.accessToken;
    console.log(res.body.accessToken);
});

afterAll(async () => {
    console.log("afterAll");
    await mongoose.connection.close();
});

describe("PostController", () => {
    test("Get all posts", async () => {
        const res = await request(app)
            .get("/post")
            .set("Authorization", "Bearer " + accessToken);
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    test("Create a new post", async () => {
        const res = await request(app)
            .post("/post")
            .set("Authorization", "Bearer " + accessToken)
            .send({ post, user });
        expect(res.statusCode).toBe(201);
        expect(res.body.title).toBe(post.title);
        postId = res.body._id;
    });

    test("Get post by ID", async () => {
        const res = await request(app)
            .get(`/post/${postId}`)
            .set("Authorization", "Bearer " + accessToken);
        expect(res.statusCode).toBe(200);
        expect(res.body._id).toBe(postId);
    });

    test("Update a post", async () => {
        const updatedPost = {
            ...post,
            title: "Updated Test Post",
            _id: postId,
        };
        const res = await request(app)
            .put("/post")
            .set("Authorization", "Bearer " + accessToken)
            .send({ post: updatedPost });
        expect(res.statusCode).toBe(200);
    });
    test("Delete a post", async () => {
        const res = await request(app)
            .delete(`/post/${postId}`)
            .set("Authorization", "Bearer " + accessToken);
        expect(res.statusCode).toBe(200);
        const resGet = await request(app)
            .get(`/post/${postId}`)
            .set("Authorization", "Bearer " + accessToken);
        expect(resGet.statusCode).toBe(404);
    });
});
