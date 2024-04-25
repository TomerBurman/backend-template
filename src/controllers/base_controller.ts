import { Request, Response } from "express";
import mongoose from "mongoose";

export default class BaseController<ModelType> {
    model: mongoose.Model<ModelType>;
    constructor(model: mongoose.Model<ModelType>) {
        this.model = model;
    }
    async get(req: Request, res: Response) {
        console.log("Get students");
        try {
            if (req.query.name) {
                const item = await this.model.find({ name: req.query.name });
                return res.status(200).send(item);
            } else {
                const item = await this.model.find();
                return res.status(200).send(item);
            }
        } catch (error) {
            return res.status(400).send(error.message);
        }
    }
    async getById(req: Request, res: Response) {
        console.log("student get by id");
        try {
            const item = await this.model.findById(req.params.id);
            if (item) {
                return res.status(200).send(item);
            } else {
                return res.status(404).send("not found");
            }
        } catch (error) {
            return res.status(400).send(error.message);
        }
    }

    async post(req: Request, res: Response) {
        console.log(req.body);
        try {
            const item = await this.model.create(req.body);
            console.log(item);
            res.status(201).send(item);
        } catch (error) {
            console.log(error);
            res.status(400).send(error.message);
        }
    }

    // Finds a student by their ID and updates values
    async put(req: Request, res: Response) {
        console.log(req.body);
        try {
            const { _id, ...updatedFields } = req.body;
            if (_id) {
                delete updatedFields._id;
            }
            const item = await this.model.findOneAndUpdate(
                { _id: req.params.id },
                updatedFields,
                {
                    new: true,
                }
            );
            if (item) {
                res.status(200).send(item);
            } else {
                res.status(404).send("Student not found");
            }
        } catch (error) {
            console.log(error);
            res.status(400).send(error.message);
        }
    }

    async remove(req: Request, res: Response) {
        console.log("delete");
        try {
            const item = await this.model.findOneAndDelete(
                { _id: req.params.id },
                req.body
            );
            if (item) {
                res.status(200).send(item);
            } else {
                res.status(404).send("not found");
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
}
