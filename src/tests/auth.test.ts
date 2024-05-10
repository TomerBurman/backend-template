import request from "supertest";
import appInit from "../App";
import mongoose from "mongoose";
import { Express } from "express";
import User from "../models/user_model";

let app: Express;

const user = {
    email: "tome55an@gmail.com",
    password: "12345",
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
    test("Post Login ", async () => {
        const res = await request(app).post("/auth/login").send(user);
        console.log(res.body);
        expect(res.statusCode).toBe(200);
        accessToken = res.body.accessToken;
        refreshToken = res.body.refreshToken;
        expect(accessToken).not.toBeNull();
        expect(refreshToken).not.toBeNull();
        const res2 = await request(app)
            .get("/student")
            .set("Authorization", "Bearer " + accessToken);
        console.log("The students " + res2.body);
        expect(res2.statusCode).toBe(200);
    });
    test("Post Logout ", async () => {
        const res = await request(app).post("/auth/login").send({
            email: "tome55an@gmail.com",
            password: "12345",
        });
        expect(res.statusCode).toBe(200);
    });

    const timeout = (ms: number) => {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    };
    jest.setTimeout(10000);
    test("refresh token", async () => {
        const res = await request(app).post("/auth/login").send(user);
        expect(res.statusCode).toBe(200);
        refreshToken = res.body.refreshToken;
        const res2 = await request(app)
            .get("/auth/refresh")
            .set("Authorization", "Bearer " + refreshToken);
        expect(res2.statusCode).toBe(200);
        accessToken = res2.body.accessToken;
        refreshToken = res2.body.refreshToken;
        expect(accessToken).not.toBeNull();
        expect(refreshToken).not.toBeNull();
        const res3 = await request(app)
            .get("/student")
            .set("Authorization", "Bearer " + accessToken);
        expect(res3.statusCode).toBe(200);
        await timeout(6000);
        const res4 = await request(app)
            .get("/student")
            .set("Authorization", "Bearer " + refreshToken);
        expect(res4.statusCode).not.toBe(200);
    });
    test("refresh token violation", async () => {
        const res = await request(app).post("/auth/login").send(user);
        const res3 = await request(app)
            .get("/auth/refresh")
            .set("Authorization", "Bearer " + res.body.refreshToken)
            .send();
        console.log("Response " + res3.body);
        expect(res3.statusCode).toBe(200);
        const oldRefreshToken = refreshToken;
        accessToken = res.body.accessToken;
        refreshToken = res.body.refreshToken;
        expect(accessToken).not.toBeNull();
        expect(refreshToken).not.toBeNull();
        const res1 = await request(app)
            .get("/auth/refresh")
            .set("Authorization", "Bearer " + oldRefreshToken)
            .send();
        expect(res1.statusCode).not.toBe(200);
        const res2 = await request(app)
            .get("/auth/refresh")
            .set("Authorization", "Bearer " + accessToken)
            .send();
        expect(res2.statusCode).not.toBe(200);
    });
});
