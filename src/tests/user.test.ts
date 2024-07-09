import request from "supertest";
import appInit from "../App";
import mongoose from "mongoose";
import { Express } from "express";
import User from "../models/user_model";

let app: Express;

const user = {
    email: "tome55an@gmail.com",
    password: "12345",
    name: "Test User",
    bio: "This is a test user",
    image: "test_image.png",
};

let accessToken = "";
let userId = "";

beforeAll(async () => {
    app = await appInit();
    console.log("beforeAll");
    await User.deleteMany({ email: user.email });

    // Register and login the user to get the access token
    await request(app).post("/auth/register").send(user);
    const res = await request(app).post("/auth/login").send(user);
    accessToken = res.body.accessToken;
    const userRes = await User.findOne({ email: user.email });
    userId = userRes._id.toString();
});

afterAll(async () => {
    console.log("afterAll");
    await mongoose.connection.close();
});

describe("UserController", () => {
    test("Get all users", async () => {
        const res = await request(app)
            .get("/user")
            .set("Authorization", "Bearer " + accessToken);
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    test("Get user by ID", async () => {
        const res = await request(app)
            .get(`/user/${userId}`)
            .set("Authorization", "Bearer " + accessToken);
        expect(res.statusCode).toBe(200);
        expect(res.body._id).toBe(userId);
        expect(res.body.email).toBe(user.email);
        expect(res.body.name).toBe(user.name);
    });

    test("Update a user", async () => {
        const updatedUser = { ...user, name: "Updated Test User", _id: userId };
        const res = await request(app)
            .put("/user")
            .set("Authorization", "Bearer " + accessToken)
            .send({ user: updatedUser });
        expect(res.statusCode).toBe(200);
    });

    test("Delete a user", async () => {
        const res = await request(app)
            .delete(`/user/${userId}`)
            .set("Authorization", "Bearer " + accessToken);
        expect(res.statusCode).toBe(200);
        const resGet = await request(app)
            .get(`/user/${userId}`)
            .set("Authorization", "Bearer " + accessToken);
        expect(resGet.statusCode).toBe(404);
    });
});
