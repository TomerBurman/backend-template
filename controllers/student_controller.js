const Student = require("../models/student_model.js");

const getStudents = async (req, res, next) => {
    console.log("Get students");
    let student;
    try{
        if (req.query.name){
            student = await Student.find({name: req.query.name});

        }else{
            student = await Student.find()
        }
        res.status(200).send(student);
}catch(error){
    res.status(400).send(error.message);

}
}

const getStudentById = async (req, res, next) => {
    console.log("student get by id");
    try{
        const student = await Student.findById(req.params.id);
        if (student){
            res.status(200).send(student);
        }else{
            res.status(404).send("Student not found");
        }
    }catch(error){
        res.status(400).send(error.message);
    }
}

const postStudent = async (req, res, next) => {
    console.log(req.body);
    try{
        const student = await Student.create(req.body);
        console.log(student);
        res.status(201).send(student);
    }
    catch(error){
        console.log(error);
        res.status(400).send(error.message);
    }
}

// Finds a student by their ID and updates values
const updateStudent = async (req, res, next) => {
    console.log(req.body);
    try{
        const {_id, ...updatedFields} = req.body;
        if(_id){
            delete updatedFields._id;
        }
        const updatedStudent = await Student.findOneAndUpdate({_id:req.params.id}, updatedFields, {
            new: true
          });
          if (updatedStudent){
        res.status(200).send(updatedStudent)
          }else{
            res.status(404).send("Student not found");
          }
    }catch(error){
        console.log(error)
        res.status(400).send(error.message);
    }

}

const deleteStudent = async (req, res, next) => {
    console.log("student delete");
    try{
        const deletedStudent = await Student.findOneAndDelete({_id:req.params.id}, req.body, {
            new:true
        });
        if (deletedStudent){
            res.status(200).send(deletedStudent);
        }else{
            res.status(404).send("Student not found");
        }
    }catch(error){
        res.status(400).send(error.message);
    }
}


module.exports = {getStudents, postStudent, updateStudent, deleteStudent, getStudentById}