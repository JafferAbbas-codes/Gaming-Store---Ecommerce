import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Auth } from './auth.model';
import jwt = require('jsonwebtoken');
import bcrypt = require('bcryptjs');
@Injectable()
export class AuthService {
    //products: Auth[] = [];

    constructor(@InjectModel('Auth') private readonly authModel: Model<Auth>) { }

    async signin(email, pass) {
        try {
            // console.log(req.body)


            // const getUser = await read.getUserLogin(req)
            try {
                const userExist = await this.authModel.findOne({ email: email })
                if (!userExist) {
                    return {error : "User with this email doesnot exist"}
                }
                if (!bcrypt.compareSync(pass, userExist.hash)) return {error:"Wrong Password"};
                // const newUser = new this.authModel({ email, pass });
                const token = jwt.sign({ email: userExist.email }, 'secret', { expiresIn: '1h' });
                const user = {
                    userExist,
                    token
                }
                console.log("Signed IN!")
                return user;
            }
            catch (error) {
                throw [404,error.message]
            }

        }
        catch (error) {
            console.log(error)
            throw [404,error.message]
        }
    }

    async signup(req){
        // console.log(req,"requesttttt")
        try{
            console.log("req object : " , req)
            // console.log("signup 2")
            const uniqueMail  = await this.authModel.findOne({email:req.email})
            console.log(uniqueMail)
            if(!uniqueMail){
                // console.log("inside if")
                req.hash = bcrypt.hashSync(req.password, 8);
                // console.log(req,"reqqq4")
                delete req.password;
   
                // console.log(req,"req222")
                const newUser = new this.authModel(req);
                const userExist = await this.authModel.create(newUser)
                // const signupDetails = user

                const token = jwt.sign({ email: userExist.email }, 'secret', { expiresIn: '1h' });
                const user = {
                    userExist,
                    token
                }
                console.log("Signed IN!");
                return user;
            }
            else {
                // console.log("inside else")
                return "User Already Exist"
            }
        }
        catch(error){
            console.log(error)
            throw [404,error.message]
    
        }
    }
}
