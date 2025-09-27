"use client"
import LeftSide from "../../components/LeftSide"
import { useRouter } from "next/navigation"
import Image from "next/image"
import ChatSupportBtn from "../../components/ChatSupportBtn"
import { useState } from "react"
import { authAPI } from '@/lib/api/auth'

export default function VoterLogin() {
  const router = useRouter()
  const [form, setForm] = useState({ userId: "", password: "" })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handlePreRegister = () => {
    router.push("/pre-register")
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError("") // Clear error when user types
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const data = await authAPI.voterLogin({
        userId: form.userId,
        password: form.password,
      })
      
      // Store voter data with correct token
      localStorage.setItem("voterToken", data.token) // Use voterToken for voters
      localStorage.setItem("voter", JSON.stringify(data.user))

      // Use router.push instead of direct assignment
      router.push(data.redirectTo || "/voter/dashboard")
    } catch (error) {
      console.error("Voter login error:", error)
      
      // Enhanced error handling with user-friendly messages
      let errorMessage = "Login failed. Please try again."
      
      if (error.message) {
        if (error.message.includes("Invalid credentials")) {
          errorMessage = "Invalid School ID or password. Please check your credentials and try again."
        } else if (error.message.includes("Too many")) {
          errorMessage = "Too many login attempts. Please wait 15 minutes before trying again."
        } else if (error.message.includes("Student not found") || error.message.includes("not found")) {
          errorMessage = "School ID not found. Please check your School ID or contact support if you believe this is an error."
        } else if (error.message.includes("Account not activated") || error.message.includes("not activated")) {
          errorMessage = "Your account is not yet activated. Please complete the pre-registration process first."
        } else if (error.message.includes("Network Error")) {
          errorMessage = "Connection error. Please check your internet connection and try again."
        } else if (error.message.includes("Invalid School ID format")) {
          errorMessage = "Please enter a valid School ID format."
        } else {
          errorMessage = error.message
        }
      }
      
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

 return (
  <div className="min-h-screen flex items-center justify-center bg-blue-50">
    <div className="flex flex-col md:flex-row bg-white shadow-lg md:rounded-lg overflow-hidden w-full max-w-5xl min-h-[550px]">
      {/* Left Side */}
      <LeftSide />

      {/* Right Side */}
      <div className="flex-1 flex flex-col items-center justify-evenly p-8 gap-6 overflow-auto">
        
        {/* Header */}
       <div className="flex flex-row items-center gap-3 text-left">
          {/* Icon */}
          <img
            src="voteicon.png"
            alt="Vote Icon"
            className="w-14 h-14"
          />

          {/* Texts */}
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-blue-800 text-center">WELCOME</h2>
            <p className="text-blue-500 text-base md:mt-2">Please login to your account</p>
          </div>
        </div>


        {/* Form */}
        <div className="w-full max-w-2xl">
          <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
            
            {/* Error */}
            {error && (
              <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg text-base">
                {error}
              </div>
            )}

            {/* User ID */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Image src="/user.png" alt="User Icon" width={20} height={20} />
              </div>
              <input
                type="text"
                name="userId"
                placeholder="Enter your School ID"
                maxLength={8}
                value={form.userId}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 text-blue-500 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-base"
                required
                disabled={isLoading}
              />
            </div>

            {/* Password */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Image src="/lock.png" alt="Password Icon" width={20} height={20} />
              </div>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 text-blue-500 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-base"
                required
                disabled={isLoading}
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-row gap-2 justify-evenly mt-2 md:mt-8">
              <button
                type="submit"
                disabled={isLoading || !form.userId.trim() || !form.password.trim()}
                className="w-full cursor-pointer bg-blue-600 rounded-md px-7 py-3 text-white font-bold shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition duration-200 text-base"
              >
                {isLoading ? "Logging in..." : "Log In"}
              </button>
              <button
                type="button"
                onClick={handlePreRegister}
                disabled={isLoading}
                className="w-full cursor-pointer bg-white rounded-lg px-7 py-3 text-blue-600 font-bold border border-blue-600 shadow-md disabled:opacity-50 hover:bg-blue-50 transition duration-200 text-base"
              >
                Pre Register
              </button>
            </div>
          </form>
        </div>

        {/* Support */}
        <ChatSupportBtn />
      </div>
    </div>
  </div>
);
}
