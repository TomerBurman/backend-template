import request from "supertest";

import appInit from "../App";
import mongoose from "mongoose";
import Student from "../models/student_model";
import { Express } from "express";

let app: Express;

const testUser = {
    email: "test@exmaple.com",
    password: "123456",
    accessToken: null,
};
beforeAll(async () => {
    app = await appInit();
    console.log("beforeAll");
    await Student.deleteMany();
    await request(app).post("/auth/register").send(testUser);
    const res = await request(app).post("/auth/login").send(testUser);
    testUser.accessToken = res.body.accessToken;
});

afterAll(async () => {
    console.log("afterAll");
    await mongoose.connection.close();
});

const students = [
    {
        name: "John Doe7",
        _id: "142345",
        age: 22,
    },
    {
        name: "John Doe8",
        _id: "1234656",
        age: 23,
    },
    {
        name: "John Doe7",
        _id: "12354567",
        age: 24,
    },
    {
        name: "unpresent student",
        _id: "00000",
        age: 24,
    },
];

describe("Student", () => {
    test("Get /student empty collection", async () => {
        console.log("Test student get all");
        const res = await request(app)
            .get("/student")
            .set("Authorization", "Bearer " + testUser.accessToken);
        expect(res.statusCode).toBe(200);
        const data = res.body;
        expect(data).toEqual([]);
    });

    test("Post /student", async () => {
        const res = await request(app)
            .post("/student")
            .send(students[0])
            .set("Authorization", "Bearer " + testUser.accessToken);
        expect(res.statusCode).toEqual(201);
        expect(res.body.name).toEqual(students[0].name);
        const res2 = await request(app)
            .get("/student")
            .set("Authorization", "Bearer " + testUser.accessToken);
        expect(res2.statusCode).toEqual(200);
        const data = res2.body;
        expect(data[0].name).toBe(students[0].name);
        expect(data[0]._id).toBe(students[0]._id);
        expect(data[0].age).toBe(students[0].age);
    });

    test("Get /student/:id", async () => {
        const res = await request(app)
            .get("/student/" + students[0]._id)
            .set("Authorization", "Bearer " + testUser.accessToken);
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe(students[0].name);
        expect(res.body._id).toBe(students[0]._id);
        expect(res.body.age).toBe(students[0].age);
    });

    test("Fail get /student/:id", async () => {
        const res = await request(app)
            .get("/student/0000")
            .set("Authorization", "Bearer " + testUser.accessToken);
        expect(res.statusCode).toBe(404);
    });

    test("Delete /student", async () => {
        const res = await request(app)
            .delete("/student/" + students[0]._id)
            .set("Authorization", "Bearer " + testUser.accessToken);
        expect(res.statusCode).toBe(200);
    });

    test("Fail delete /student", async () => {
        const res = await request(app)
            .delete("/student/00000")
            .set("Authorization", "Bearer " + testUser.accessToken);
        expect(res.statusCode).toBe(404);
    });
    test("Update /student", async () => {
        const res1 = await request(app)
            .post("/student")
            .send(students[0])
            .set("Authorization", "Bearer " + testUser.accessToken);
        expect(res1.statusCode).toBe(201);
        const res2 = await request(app)
            .put("/student/" + students[0]._id)
            .send(students[1])
            .set("Authorization", "Bearer " + testUser.accessToken);
        expect(res2.statusCode).toBe(200);
        expect(res2.body.age).toBe(students[1].age);
        expect(res2.body._id).toBe(students[0]._id);
        expect(res2.body.name).toBe(students[1].name);
    });
    test("Fail update /student", async () => {
        const res = await request(app)
            .put("/student/")
            .send(students[3])
            .set("Authorization", "Bearer " + testUser.accessToken);
        expect(res.statusCode).toBe(404);
    });
});
