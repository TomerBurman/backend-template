import request from "supertest";
import appInit from "../App";
import mongoose from "mongoose";
import Post from "../models/post_model";
import { Express } from "express";
import User from "../models/user_model";

let app: Express;

const testUser = {
    email: "yossi@gmail.com",
    password: "12345",
    accessToken: null,
    refreshToken: null,
};
beforeAll(async () => {
    app = await appInit();
    console.log("beforeAll");
    await Post.deleteMany();
    await User.deleteMany({ email: testUser.email });
    await request(app).post("/auth/register").send(testUser);
    const res1 = await request(app).post("/auth/login").send(testUser);
    testUser.accessToken = res1.body.accessToken;
    testUser.refreshToken = res1.body.refreshToken;
    expect(res1.statusCode).toBe(200);
    expect(testUser.accessToken).not.toBeNull();
    expect(testUser.refreshToken).not.toBeNull();
});

afterAll(async () => {
    console.log("afterAll");
    await mongoose.connection.close();
});

describe("Post", () => {
    test("Get /post empty collection", async () => {
        const res = await request(app)
            .get("/post")
            .set("Authorization", "Bearer " + testUser.accessToken);
        expect(res.statusCode).toBe(200);
        const data = res.body;
        expect(data).toEqual([]);
    });
    const post = {
        title: "This is the post title",
        description: "This is the description",
        ingredients: ["salt", "pepper", "cabbage"],
        imgUrl: "http://localhost/images",
        steps: ["No steps"],
        owner: "Moshe",
    };
    test("Post /post", async () => {
        const res = await request(app)
            .post("/post")
            .set("Authorization", "Bearer " + testUser.accessToken)
            .send(post);
        expect(res.statusCode).toBe(201);
    });
});
