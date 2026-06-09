import cloudinary from "../lib/Cloudinary.js"
import { generatetoken } from "../lib/utils.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

export const register = async(req,res)=>{
    const {fullName,email,password} = req.body
    try {

        if(!fullName || !email || !password){
             return res.status(400).json({message:"all feilds required"})
        }

        if(password.length < 6 ){
            return res.status(400).json({message:"password must be 6 characters long"})
        }

        const user = await User.findOne({email})
        if (user) {
            return res.status(400).json({message: "Email already Exist"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedpass = await bcrypt.hash(password,salt)

        const newUser = await User.create({
            fullName,
            email,
            password:hashedpass
        })

        if (newUser) {
            generatetoken(newUser._id,res)
            await newUser.save();

            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilepic:newUser.profilepic
            })
        }else{
            res.status(400).json({message: "Invalid User data"})
        }
    } catch (error) {
        console.log("error in controller");
        res.status(500).json({message:"server error"})
    }
}

export const login = async(req,res)=>{
   const {email,password} = req.body
   try {
    // if(!email || !password){
    //          return res.status(400).json({message:"all feilds required"})
    //     }
    const user =await User.findOne({ email })
    if (!user) {
        return res.status(404).json({message:"email not valid"})
    }

    const correctpassword = await bcrypt.compare(password,user.password)
    
    if (!correctpassword) {
        return res.status(404).json({message:"enter valid password"})
    }

    generatetoken(user._id,res)

    res.status(201).json({
                _id:user._id,
                fullName:user.fullName,
                email:user.email,
                profilepic:user.profilepic
            })

   } catch (error) {
    console.log("error in controller",error);
    res.status(500).json({message:"server error"})
   }
}

export const logout = (req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(201).json({message:"logout Successfully"})
    } catch (error) {
        console.log("error in controller");
    res.status(500).json({message:"server error"})
    }
}

export const updateprofilepic = async(req,res)=>{
    try {
        const { profilepic } = req.body
        const userID = req.user._id

        if (!profilepic) {
            return res.status(404).json({message:"profilepic required"})
        }

       const uploadres = await cloudinary.uploader.upload(profilepic)

       const updateduser = await User.findByIdAndUpdate(userID,{profilepic:uploadres.secure_url},{new:true})

       res.status(200).json(updateduser)
    } catch (error) {
        console.log("error in controller",error);
    res.status(500).json({message:"server error"})
    }
}

export const checkAuth = (req,res) => {
        try {
            res.status(200).json(req.user)
        } catch (error) {
            console.log("error in controller");
    res.status(500).json({message:"server error"})
        }
    }