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
let refreshToken = "";

beforeAll(async () => {
    app = await appInit();
    console.log("beforeAll");
    await User.deleteMany({ email: user.email });
});

afterAll(async () => {
    console.log("afterAll");
    await mongoose.connection.close();
});

describe("Auth", () => {
    test("Post Register", async () => {
        const res = await request(app).post("/auth/register").send(user);
        expect(res.statusCode).toBe(200);
    });

    test("Post Login", async () => {
        const res = await request(app).post("/auth/login").send(user);
        console.log(res.body);
        expect(res.statusCode).toBe(200);
        accessToken = res.body.accessToken;
        refreshToken = res.body.refreshToken;
        expect(accessToken).not.toBeNull();
        expect(refreshToken).not.toBeNull();
    });

    test("Get Protected Route", async () => {
        const res = await request(app)
            .get("/user")
            .set("Authorization", "Bearer " + accessToken);
        console.log("The user " + res.body);
        expect(res.statusCode).toBe(200);
    });

    test("Post Logout", async () => {
        const res = await request(app)
            .get("/auth/logout")
            .set("Authorization", "Bearer " + accessToken)
            .send();
        expect(res.statusCode).toBe(200); // Ensure logout function returns 200 status code
    });

    jest.setTimeout(20000); // Increase timeout to ensure tests have enough time to complete
    test("Refresh Token", async () => {
        const res = await request(app)
            .get("/auth/refresh")
            .set("Authorization", "Bearer " + refreshToken);
        expect(res.statusCode).toBe(200);
        accessToken = res.body.accessToken;
        refreshToken = res.body.refreshToken;
        expect(accessToken).not.toBeNull();
        expect(refreshToken).not.toBeNull();
    });

    test("Refresh Token Violation", async () => {
        const oldRefreshToken = refreshToken;

        // Wait for the token to expire (assuming token expiration is set to 3 seconds)
        await new Promise((resolve) => setTimeout(resolve, 10000));

        const res1 = await request(app)
            .get("/auth/refresh")
            .set("Authorization", "Bearer " + oldRefreshToken)
            .send();
        expect(res1.statusCode).not.toBe(404); // Old refresh token should not be valid anymore

        // Log in again to get a new set of tokens
        const res2 = await request(app).post("/auth/login").send(user);
        expect(res2.statusCode).toBe(200);
        accessToken = res2.body.accessToken;
        refreshToken = res2.body.refreshToken;

        const res3 = await request(app)
            .get("/auth/refresh")
            .set("Authorization", "Bearer " + accessToken)
            .send();
        expect(res3.statusCode).not.toBe(200); // Access token should not be used for refresh endpoint
    });
});
