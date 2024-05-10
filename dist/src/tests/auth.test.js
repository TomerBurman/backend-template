"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const App_1 = __importDefault(require("../App"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = __importDefault(require("../models/user_model"));
let app;
const user = {
    email: "tome55an@gmail.com",
    password: "12345",
};
let accessToken = "";
let refreshToken = "";
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    app = yield (0, App_1.default)();
    console.log("beforeAll");
    yield user_model_1.default.deleteMany({ email: user.email });
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("afterAll");
    yield mongoose_1.default.connection.close();
}));
describe("Auth", () => {
    test("Post Register", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).post("/auth/register").send(user);
        expect(res.statusCode).toBe(200);
    }));
    test("Post Login ", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).post("/auth/login").send(user);
        console.log(res.body);
        expect(res.statusCode).toBe(200);
        accessToken = res.body.accessToken;
        refreshToken = res.body.refreshToken;
        expect(accessToken).not.toBeNull();
        expect(refreshToken).not.toBeNull();
        const res2 = yield (0, supertest_1.default)(app)
            .get("/student")
            .set("Authorization", "Bearer " + accessToken);
        console.log("The students " + res2.body);
        expect(res2.statusCode).toBe(200);
    }));
    test("Post Logout ", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).post("/auth/login").send({
            email: "tome55an@gmail.com",
            password: "12345",
        });
        expect(res.statusCode).toBe(200);
    }));
    const timeout = (ms) => {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    };
    jest.setTimeout(10000);
    test("refresh token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).post("/auth/login").send(user);
        expect(res.statusCode).toBe(200);
        refreshToken = res.body.refreshToken;
        const res2 = yield (0, supertest_1.default)(app)
            .get("/auth/refresh")
            .set("Authorization", "Bearer " + refreshToken);
        expect(res2.statusCode).toBe(200);
        accessToken = res2.body.accessToken;
        refreshToken = res2.body.refreshToken;
        expect(accessToken).not.toBeNull();
        expect(refreshToken).not.toBeNull();
        const res3 = yield (0, supertest_1.default)(app)
            .get("/student")
            .set("Authorization", "Bearer " + accessToken);
        expect(res3.statusCode).toBe(200);
        yield timeout(6000);
        const res4 = yield (0, supertest_1.default)(app)
            .get("/student")
            .set("Authorization", "Bearer " + refreshToken);
        expect(res4.statusCode).not.toBe(200);
    }));
    test("refresh token violation", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app)
            .get("/auth/refresh")
            .set("Authorization", "Bearer " + refreshToken)
            .send();
        console.log("Response " + res.body);
        expect(res.statusCode).toBe(200);
        const oldRefreshToken = refreshToken;
        accessToken = res.body.accessToken;
        refreshToken = res.body.refreshToken;
        expect(accessToken).not.toBeNull();
        expect(refreshToken).not.toBeNull();
        const res1 = yield (0, supertest_1.default)(app)
            .get("/auth/refresh")
            .set("Authorization", "Bearer " + oldRefreshToken)
            .send();
        expect(res1.statusCode).not.toBe(200);
        const res2 = yield (0, supertest_1.default)(app)
            .get("/auth/refresh")
            .set("Authorization", "Bearer " + accessToken)
            .send();
        expect(res2.statusCode).not.toBe(200);
    }));
});
//# sourceMappingURL=auth.test.js.map