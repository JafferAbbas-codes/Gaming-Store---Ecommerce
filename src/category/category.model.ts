import * as mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
            unique: true
        }
    },
    { timestamps: true }
);

export interface Category extends mongoose.Document {
    _id: string;
    name: string;
}