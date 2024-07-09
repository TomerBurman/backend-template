import mongoose from "mongoose";

/**
 * IPost describes recipe of a dish.
 */
export interface IPost {
    title: string;
    ingredients: string[];
    description: string;
    steps: string[];
    owner: string;
    images: string[];
    ownerName: string;
    savedUsers: string[];
}
const postSchema = new mongoose.Schema<IPost>({
    title: {
        type: String,
        required: true,
    },
    ingredients: {
        type: [String],
        required: true,
    },
    steps: {
        type: [String],
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
    images: { type: [String] },
    ownerName: { type: String },
    savedUsers: { type: [String] },
});

export default mongoose.model<IPost>("Post", postSchema);
