import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast"
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set,get)=>({

    messages:[],
    users:[],
    selecteduser:null,
    isuserloading:false,
    ismessagesloading:false,

    getusers: async() =>{
        set({isuserloading:true})
        try {
            const res = await axiosInstance.get("/message/users")
            set({users:res.data})
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({ isuserloading:false })
        }
    },

    getmessages: async(userID) =>{
        set({ismessagesloading:true})
        try {
            const res = await axiosInstance.get(`/message/${userID}`)
            set({messages:res.data})
        } catch (error) {
           toast.error(error.response.data.message)
        }finally{
            set({ ismessagesloading:false })
        }
    },

    sendMessage: async(messagedata) => {
        const {selecteduser,messages} = get()
        try {
            const res = await axiosInstance.post(`/message/send/${selecteduser._id}`,messagedata)
            set({messages:[...messages,res.data]})
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    subscribeTomessages: () => {
        const {selecteduser}= get()
        if(!selecteduser) return

        const socket = useAuthStore.getState().socket

        socket.on("newmessage",(message)=>{
            if(message.senderID !== selecteduser._id) return
            
            set({messages: [...get().messages,message]})
        })
    },

    unsubscribeTomessages: () => {
        const socket = useAuthStore.getState().socket
         if (!socket) return;
        socket.off("newmessage")
    },

    setSelectedUser: async( selecteduser ) =>{
        set({selecteduser})
    }
}))