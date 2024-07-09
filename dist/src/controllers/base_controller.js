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
Object.defineProperty(exports, "__esModule", { value: true });
class BaseController {
    constructor(model) {
        this.model = model;
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Get all items");
            try {
                const items = yield this.model.find();
                return res.status(200).send(items);
            }
            catch (error) {
                return res.status(400).send(error.message);
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("student get by id");
            try {
                const item = yield this.model.findById(req.params.id);
                if (item) {
                    return res.status(200).send(item);
                }
                else {
                    return res.status(404).send("not found");
                }
            }
            catch (error) {
                return res.status(400).send(error.message);
            }
        });
    }
    post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            try {
                const item = yield this.model.create(req.body);
                console.log(item + "This is the item");
                res.status(201).send(item);
            }
            catch (error) {
                console.log(error);
                res.status(400).send(error.message);
            }
        });
    }
    // Finds a student by their ID and updates values
    put(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const _a = req.body, { _id } = _a, updatedFields = __rest(_a, ["_id"]);
                if (_id) {
                    delete updatedFields._id;
                }
                const item = yield this.model.findOneAndUpdate({ _id: req.body._id }, updatedFields, {
                    returnDocumentnew: true,
                });
                if (item) {
                    console.log(item);
                    res.status(200).send(item);
                }
                else {
                    console.log("Record not found");
                    res.status(404).send("Record not found");
                }
            }
            catch (error) {
                console.log(error);
                res.status(400).send(error.message);
            }
        });
    }
    remove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("delete");
            try {
                const item = yield this.model.findOneAndDelete({ _id: req.params.id }, req.body);
                if (item) {
                    res.status(200).send(item);
                }
                else {
                    res.status(404).send("not found");
                }
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
    }
}
exports.default = BaseController;
//# sourceMappingURL=base_controller.js.map