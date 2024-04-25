import Student from "../models/student_model";
import BaseController from "./base_controller";
import { IStudent } from "../models/student_model";

const studentController = new BaseController<IStudent>(Student);

export default studentController;
