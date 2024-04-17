const express = require("express");
const router = express.Router();
const student_controller = require("../controllers/student_controller")

router.get("/", student_controller.getStudents);
router.get("/:id", student_controller.getStudentById);


router.post("/", student_controller.postStudent);


router.put("/", student_controller.updateStudent);
router.put("/:id", student_controller.updateStudentById);


router.delete("/", student_controller.deleteStudent);
router.delete("/:id", student_controller.deleteStudentById);
module.exports = router;
