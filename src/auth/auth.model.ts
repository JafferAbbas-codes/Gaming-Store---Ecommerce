import * as mongoose from 'mongoose';

export const AuthSchema= new mongoose.Schema({
    email: {type:String,required:true,unique:true},
    hash: {type:String,required:true},
})


export interface Auth extends mongoose.Document{
    
        email: string;
        hash: string; 
        
}