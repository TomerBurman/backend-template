const Student = require("../models/student_model.js");

const getStudents = (req, res, next) => {
    res.send("students get");
}
const getStudentById = (req, res, next) => {
    res.send("student get by id");
}

const postStudent = async (req, res, next) => {
    console.log(req.body);
    try{
        console.log()
        const student = await Student.create(req.body);
        console.log(student);
        res.status(201).send(student);
    }
    catch(error){
        console.log(error);
        res.status(400).send(error.message);
    }
}

const updateStudent = (req, res, next) => {
    res.send("student put");
}
const updateStudentById = (req, res, next) => {
    res.send("student put by id");
}

const deleteStudent = (req, res, next) => {
    res.send("student delete");
}
const deleteStudentById = (req, res, next) => {
    res.send("student delete by id");
}

module.exports = {getStudents, postStudent, updateStudent, deleteStudent, updateStudentById, deleteStudentById, getStudentById}