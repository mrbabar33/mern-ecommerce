
import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt, { compare } from "bcrypt";
import jwt from "jsonwebtoken"


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};


//Route for loginuser//
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });    // ← "user" yahan declare ho raha hai
        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);    // ← yahan "user" use ho raha hai
        if (isMatch) {
            const token = createToken(user._id);    // ← yahan bhi
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

//Route for user register
const registerUser = async(req,res)=>{
try{
const { name, email, password } = req.body;
const exists =  await userModel.findOne({email});
if(exists){
    return res.json({ success:false,message: "User already exists"})
}
if (!validator.isEmail(email)) {
    return res.json({ success: false, message: "Please enter a valid email" });
}
if (password.length < 8) {
    return res.json({ success: false, message: "Please enter a strong password" });
}
// by salt
const salt = await bcrypt.genSalt(10)
// by hashedpassword
const hashedPassword = await bcrypt.hash(password,salt)
// save new user

const newUser = new userModel({
    name,
    email,
    password:hashedPassword
})
const user = await newUser.save()
//tokencreate 
const token = createToken(user._id);
   res.json({ success: true, token });

    
} catch (error){
    console.log(error);
    res.json({success: false, message: error.message});
}
}
//route for admin login

const adminLogin = async(req,res)=>{

}
export { loginUser, registerUser, adminLogin };