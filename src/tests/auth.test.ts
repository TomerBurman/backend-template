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
        const accessToken = res.body.accessToken;
        expect(accessToken).not.toBeNull();
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
});
