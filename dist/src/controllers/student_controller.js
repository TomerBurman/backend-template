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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const student_model_1 = __importDefault(require("../routes/models/student_model"));
const getStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Get students");
    let student;
    try {
        if (req.query.name) {
            student = yield student_model_1.default.find({ name: req.query.name });
        }
        else {
            student = yield student_model_1.default.find();
        }
        res.status(200).send(student);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
const getStudentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("student get by id");
    try {
        const student = yield student_model_1.default.findById(req.params.id);
        if (student) {
            res.status(200).send(student);
        }
        else {
            res.status(404).send("Student not found");
        }
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
const postStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const student = yield student_model_1.default.create(req.body);
        console.log(student);
        res.status(201).send(student);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
});
// Finds a student by their ID and updates values
const updateStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const _a = req.body, { _id } = _a, updatedFields = __rest(_a, ["_id"]);
        if (_id) {
            delete updatedFields._id;
        }
        const updatedStudent = yield student_model_1.default.findOneAndUpdate({ _id: req.params.id }, updatedFields, {
            new: true,
        });
        if (updatedStudent) {
            res.status(200).send(updatedStudent);
        }
        else {
            res.status(404).send("Student not found");
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
});
const deleteStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("student delete");
    try {
        const deletedStudent = yield student_model_1.default.findOneAndDelete({ _id: req.params.id }, req.body);
        if (deletedStudent) {
            res.status(200).send(deletedStudent);
        }
        else {
            res.status(404).send("Student not found");
        }
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
exports.default = {
    getStudents,
    postStudent,
    updateStudent,
    deleteStudent,
    getStudentById,
};
//# sourceMappingURL=student_controller.js.map