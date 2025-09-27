"use client"
import LeftSide from "../../components/LeftSide"
import { useRouter } from "next/navigation"
import { useState } from "react"
import ChatSupportBtn from "../../components/ChatSupportBtn"
import Swal from "sweetalert2"
import { votersAPI } from '@/lib/api/voters'
import { authAPI } from '@/lib/api/auth'

export default function PreRegister() {
  const router = useRouter()
  const [form, setForm] = useState({
    schoolId: "",
    firstName: "",
    middleName: "",
    lastName: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [voterFound, setVoterFound] = useState(false)
  const [voterData, setVoterData] = useState(null)

  const handleLogin = () => {
    router.push("/voterlogin")
  }

  const handleChange = async (e) => {
    const { name, value } = e.target

    if (name === "schoolId") {
      if (value.length > 8) {
        return // Don't update if more than 8 digits
      }

      setForm({ ...form, [name]: value })
      setError("")
      setVoterFound(false)
      setVoterData(null)

      // Clear other fields when school ID changes
      setForm((prev) => ({
        ...prev,
        schoolId: value,
        firstName: "",
        middleName: "",
        lastName: "",
      }))

      if (value.length >= 4) {
        try {
          const data = await votersAPI.lookupBySchoolId(value)
          setForm((prev) => ({
            ...prev,
            firstName: data.firstName || "",
            middleName: data.middleName || "",
            lastName: data.lastName || "",
            sex: data.sex || "",
          }))
          setVoterData(data)
          setVoterFound(true)
          setError("")
        } catch (error) {
          console.error("Lookup error:", error)
          setForm((prev) => ({
            ...prev,
            firstName: "",
            middleName: "",
            lastName: "",
          }))
          setVoterFound(false)
          setVoterData(null)
          if (value.length >= 8) {
            // Only show error for complete IDs
            Swal.fire({
              icon: "error",
              title: "Student Not Found",
              text: error.message || "Student ID not found in voter database",
              confirmButtonColor: "#2563eb",
            })
          }
        }
      }
    }
  }

  const handleMatch = async (e) => {
    e.preventDefault()

    if (!voterFound || !voterData) {
      Swal.fire({
        icon: "warning",
        title: "No Student Found",
        text: "Please enter a valid school ID to find your information",
        confirmButtonColor: "#2563eb",
      })
      return
    }

    const result = await Swal.fire({
      title: "Confirm Your Information",
      html: `
        <div style="text-align: left; margin: 20px 0;">
          <p><strong>School ID:</strong> ${voterData.schoolId}</p>
          <p><strong>Name:</strong> ${voterData.firstName} ${voterData.middleName || ""} ${voterData.lastName}</p>
          <p><strong>Degree:</strong> ${voterData.degree?.degreeName || "N/A"}</p>
        </div>
        <p style="margin-top: 20px;">Is this information correct?</p>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, this is me",
      cancelButtonText: "No, let me check",
    })

    if (!result.isConfirmed) {
      return
    }

    setLoading(true)
    setError("")

    try {
      const data = await authAPI.preRegisterStep1({ schoolId: form.schoolId })
      // Store voter info for step 2
      localStorage.setItem("preRegisterVoter", JSON.stringify(data.voter))
      router.push("/pre-register-step2")
    } catch (error) {
      setError(error.message || "Registration failed")
      Swal.fire({
        icon: "error",
        title: "Registration Error",
        text: error.message || "Registration failed. Please try again.",
        confirmButtonColor: "#2563eb",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="flex flex-col md:flex-row bg-white shadow-lg md:rounded-lg overflow-hidden w-full max-w-4xl h-[600px]">
        {/* Left Side */}
        <LeftSide />
       
        {/* Right Side */}
        <div className="flex-1 flex flex-col items-center p-8 overflow-auto">
          <div className="flex flex-1 items-center mb-2">
            <img
              src="voteicon.png"
              alt="Vote Icon"
              className="w-10 h-10"
            />
            <div>
              <h2 className="text-2xl font-bold text-blue-700 text-center">Pre Registration</h2>
              <p className="text-gray-500 text-center">Enter your school ID to verify your information</p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm w-full max-w-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form className="w-full max-w-sm mb-4" onSubmit={handleMatch}>
            <input
              type="number"
              name="schoolId"
              placeholder="Enter your School ID"
              value={form.schoolId}
              onChange={handleChange}
              maxLength="8"
              min="10000000"
              max="99999999"
              className="w-full border p-3 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-blue-500"
              required
              disabled={loading}
            />
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              className="w-full border p-3 rounded mb-3 bg-gray-50 cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-blue-500"
              readOnly
            />
            <input
              type="text"
              name="middleName"
              placeholder="Middle Name"
              value={form.middleName}
              className="w-full border p-3 rounded mb-3 bg-gray-50 cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-blue-500"
              readOnly
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              className="w-full border p-3 rounded mb-3 bg-gray-50 cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-blue-500"
              readOnly
            />
            <div className="flex gap-2 w-full mt-4">
              <button
                type="button"
                onClick={handleLogin}
                disabled={loading}
                className="flex-1 border py-2 rounded text-blue-600 bg-white hover:bg-blue-50"
              >
                Log In
              </button>
              <button
                type="submit"
                disabled={loading || !voterFound}
                className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Processing..." : "Pre Register"}
              </button>
            </div>
          </form>
          <ChatSupportBtn />
        </div>
      </div>
    </div>
  );
}

