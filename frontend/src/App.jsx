import { Navigate, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Registerpage from "./pages/Registerpage"
import Loginpage from "./pages/Loginpage"
import Settingspage from "./pages/Settingspage"
import Profilepage from "./pages/Profilepage"
import Homepage from "./pages/Homepage"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"
import { Loader } from "lucide-react"
import { Toaster } from "react-hot-toast"
import { useThemeStore } from "./store/useThemeStore.js"

const App = () => {

  const{ authUser,checkAuth,isCheckingAuth,onlineUsers} = useAuthStore()
 const {theme} = useThemeStore()

 console.log({onlineUsers});
 

  useEffect(()=>{
    checkAuth()
  },[checkAuth])

  console.log(authUser);

  if (isCheckingAuth && !authUser ) return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin" />
    </div>
  )
  
  return (
<div data-theme={theme}>

<Navbar />

<Routes>
  <Route path="/" element={authUser ? <Homepage/> : <Navigate to={"/login"}/>}/>
  <Route path="/register" element={!authUser ? <Registerpage/> : <Navigate to={"/"}/>}/>
  <Route path="/login" element={!authUser ? <Loginpage/> : <Navigate to={"/"}/>}/>
  <Route path="/settings" element={<Settingspage/>}/>
  <Route path="/profile" element={authUser ? <Profilepage/> : <Navigate to={"/login"}/>}/>

</Routes>

<Toaster
  position="top-center"
  reverseOrder={true}
/>

</div>
  )
}

export default App