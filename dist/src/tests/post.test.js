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
const post_model_1 = __importDefault(require("../models/post_model"));
const user_model_1 = __importDefault(require("../models/user_model"));
let app;
const testUser = {
    email: "yossi@gmail.com",
    password: "12345",
    accessToken: null,
    refreshToken: null,
};
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    app = yield (0, App_1.default)();
    console.log("beforeAll");
    yield post_model_1.default.deleteMany();
    yield user_model_1.default.deleteMany({ email: testUser.email });
    yield (0, supertest_1.default)(app).post("/auth/register").send(testUser);
    const res1 = yield (0, supertest_1.default)(app).post("/auth/login").send(testUser);
    testUser.accessToken = res1.body.accessToken;
    testUser.refreshToken = res1.body.refreshToken;
    expect(res1.statusCode).toBe(200);
    expect(testUser.accessToken).not.toBeNull();
    expect(testUser.refreshToken).not.toBeNull();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("afterAll");
    yield mongoose_1.default.connection.close();
}));
describe("Post", () => {
    test("Get /post empty collection", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app)
            .get("/post")
            .set("Authorization", "Bearer " + testUser.accessToken);
        expect(res.statusCode).toBe(200);
        const data = res.body;
        expect(data).toEqual([]);
    }));
    const post = {
        title: "This is the post title",
        message: "This is the emessage...",
        owner: "Moshe",
    };
    test("Post /post", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app)
            .post("/post")
            .set("Authorization", "Bearer " + testUser.accessToken)
            .send(post);
        expect(res.statusCode).toBe(201);
    }));
});
//# sourceMappingURL=post.test.js.map