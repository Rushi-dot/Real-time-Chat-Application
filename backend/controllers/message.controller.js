import cloudinary from "../lib/Cloudinary.js"
import { getReceiverSocketId, io } from "../lib/socket.js"
import Message from "../models/message.model.js"
import User from "../models/user.model.js"

export const getUsersForSidebar =  async (req,res) => {
    try {
        const loggedinuser = req.user._id
        const filtereduser = await User.find({_id: {$ne:loggedinuser}}).select("-password")

        res.status(200).json(filtereduser)
    } catch (error) {
    console.log("error in controller");
    res.status(500).json({message:"server error"})
    }
}

export const getMessages = async (req,res) => {
    try {
        const { id:userToChatId } = req.params
        const myId = req.user._id

        const messages = await Message.find({
            $or:[
                {senderID:myId,receiverID:userToChatId},
                {senderID:userToChatId,receiverID:myId}
            ]
        })

        res.status(200).json(messages)
    } catch (error) {
    console.log("error in controller",error);
    res.status(500).json({message:"server error"})
    }
}

export const sendMessage = async (req,res) => {
    try {
        const {text,image} = req.body
        const {id:receiverID} = req.params
        const senderID = req.user._id

        let imageurl;
        if(image){
            const uploadres = await cloudinary.uploader.upload(image)
            imageurl = uploadres.secure_url
        }

        const newmessage = await Message.create({
            senderID,
            receiverID,
            text,
            image: imageurl,
        })

        await newmessage.save();

        const receiversocketId = getReceiverSocketId(receiverID)
        if(receiversocketId){
            io.to(receiversocketId).emit("newmessage",newmessage)
        }


        res.status(200).json(newmessage)
    } catch (error) {
    console.log("error in controller",error);
    res.status(500).json({message:"server error"})
    }
}
