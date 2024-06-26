import mongoose from "mongoose";

export interface IUser {
    email: string;
    password: string;
    tokens: string[];
    name: string;
    bio: string;
}
const userSchema = new mongoose.Schema<IUser>({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    tokens: { type: [String] },
    name: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
    },
});

export default mongoose.model<IUser>("User", userSchema);
