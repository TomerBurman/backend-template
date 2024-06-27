import mongoose from "mongoose";

/**
 * IPost describes recipe of a dish.
 */
export interface IPost {
    title: string;
    ingridients: string[];
    description: string;
    steps: string[];
    owner: string;
    images: string[];
    ownerName: string;
}
const postSchema = new mongoose.Schema<IPost>({
    title: {
        type: String,
        required: true,
    },
    ingridients: {
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
});

export default mongoose.model<IPost>("Post", postSchema);
