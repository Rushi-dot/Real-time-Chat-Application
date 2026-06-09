import jwt from "jsonwebtoken"

export const generatetoken = (userID,res)=>{
 const token = jwt.sign({userID},process.env.JWT_SECRET,{
    expiresIn:"7d"
 })

 res.cookie("jwt",token,{
    httpOnly:true
 })

 return token
}