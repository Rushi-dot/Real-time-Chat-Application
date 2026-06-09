import { useState } from "react"
import { useAuthStore } from "../store/useAuthStore"
import AuthImagePattern from "../components/AuthImagePattern"
import { Link } from "react-router-dom"
import { Eye, EyeOff, Loader2Icon, Lock, Mail, MessageSquare } from "lucide-react"


const Loginpage = () => {
     const [showPassword, setShowPassword] = useState(false)
     const [formData, setFormData] = useState({
            email:"",
            password:"",
        })

      const{isLoggingIN,logedin } = useAuthStore()
      
      
const handlesubmit = (e) => {
    e.preventDefault()
    logedin(formData)
    }      


  return (
    <div className="min-h-screen grid lg:grid-cols-2">
        <div className="flex flex-col items-center justify-center p-6 sm:p-12">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center mb-8">
                    <div className="flex flex-col items-center gap-2 group">
                        <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <MessageSquare className="size-6 text-primary" />
                        </div>
                        <h1 className="text-2xl font-bold mt-2">Create Account</h1>
                        <p className="text-base-content/60">Get started with your free account</p>
                    </div>
                </div>

                <form onSubmit={handlesubmit} className="space-y-6">

             <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                <Mail className="w-5 h-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                <Lock className="w-5 h-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={isLoggingIN}>
              {isLoggingIN ? (
                <>
                  <Loader2Icon className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Sign In"
              )}
            </button>
                </form>

            <div className="text-center">
            <p className="text-base-content/60">
               Don&apos;t have an account?{" "}
              <Link to="/register" className="link link-primary">
                 Create account
              </Link>
            </p>
          </div>
            </div>
        </div>


     <AuthImagePattern
        title={"Welcome back!"}
        subtitle={"Sign in to continue your conversations and catch up with your messages."}
      />
    </div>
  )
}

export default Loginpage