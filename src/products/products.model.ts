import * as mongoose from 'mongoose';
import { url } from 'inspector';
const { ObjectId } = mongoose.Schema.Types;

export const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required : true
  },
  imageName: {
    type:String
  },
  imageURL:{
    type:String
  },
  price: {
    type: Number,
    required: true,
  },
});

export interface Product extends mongoose.Document {
  _id: string;
  title: string;
  description: string;
  category: mongoose.Document;
  imageName : string;
  imageURL: string, 
  price: number;
}
