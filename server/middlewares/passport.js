import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import {findUserDetails} from "../models/user.model.js";
import bcrypt from "bcrypt";

const auth = passport.use(
    new LocalStrategy(async (username, password, done)=>{
        try{
            const user = await findUserDetails(username, null);
            if(!user){
                done(null, false, {message: "User Not Found"});
            }
            const isMatch = await bcrypt.compare(password, String(user[0].password));
            if(isMatch) return done(null, user);
            else return done(null, false, {message: "Incorrect Password"});
        } catch(e) {
            return done(e);
        }
    }),
);

const loginVerification = passport.authenticate("local", {session: false});

export {auth, loginVerification};