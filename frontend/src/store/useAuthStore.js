import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client"

const BASE_URL = import.meta.env.MODE === "developement" ? "http://localhost:5001/" : "/";

export const useAuthStore = create((set,get)=> ({
    authUser:null,
    isSigniningUp:false,
    isLoggingIN:false,
    isUpdatingprofile:false,
    onlineUsers:[],
    socket:null,

    isCheckingAuth:true,

    checkAuth: async()=>{
        try {
            const res = await axiosInstance.get('/auth/check');

            set({authUser:res.data})

            get().connectSocket()
        } catch (error) {
            set({authUser:null})
            console.log("error",error);            
        }finally{
            set({isCheckingAuth:false})
        }
    },

    signup: async (data) => {
    set({isSigniningUp:true})

    try {
        const res = await axiosInstance.post("/auth/register",data)

        toast.success("Account created Successfully")
        set({authUser: res.data})

         get().connectSocket()
    } catch (error) {
            console.log("error",error); 
            toast.error(error.response.data.message) 
    } finally{
        set({isSigniningUp:false})
    }
    },

    logout: async() =>{
        try {
            await axiosInstance.post("/auth/logout")
            set({authUser:null})
            toast.success("logout Successfully")
            get().disconnectSocket()
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    logedin: async(data) =>{
        set({isLoggingIN:true})
        try {
        const res = await axiosInstance.post("/auth/login",data)

        toast.success("logging in successfull")
        set({authUser:res.data})

        get().connectSocket()
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({isLoggingIN:false})
        }
    },

    updateProfile: async(data) =>{
        set({isUpdatingprofile:true})
        try {
            const res = await axiosInstance.put("/auth/updateProfilepic",data)
            set({authUser:res.data})
            toast.success("profile update successfully")
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({isUpdatingprofile:false})
        }
    },

    connectSocket: () =>{
        const {authUser} = get()

        if(!authUser || get().socket?.connected) return

        const socket = io(BASE_URL,{
            query:{
            userID: authUser._id,
            }
        })
        socket.connect()

        set({ socket })

        socket.on("getonlineusers",(userIds)=>{
            set({onlineUsers:userIds})
        })
    },
    disconnectSocket: () => {
    if (get().socket?.connected) {
        get().socket.disconnect();
    }

    set({ socket: null });
    },
}))