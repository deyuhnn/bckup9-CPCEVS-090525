'use client';
import Image from "next/image";
import { useState, useRef } from "react";

export default function ChatSupportBtn() {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    idNumber: '',
    fullName: '',
    course: '',
    birthday: '',
    email: '',
    message: '',
    photo: '',
  });
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { ...formData, selectedFile });
    
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setOpen(false);
      setSelectedFile(null);
      setFormData({
        idNumber: '',
        fullName: '',
        course: '',
        birthday: '',
        email: '',
        message: '',
        photo: ''
      });
    }, 3000);
  };

  const handleClose = () => {
    setOpen(false);
    setShowSuccess(false);
    setSelectedFile(null);
    setFormData({
      idNumber: '',
      fullName: '',
      course: '',
      birthday: '',
      email: '',
      message: '',
      photo: ''
    });
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => setOpen(true)} 
          className="bg-white rounded-full p-2  transition-all duration-300 hover:scale-110 hover:bg-blue-50;p-4 group"
        >
          <img src="/chatsprt.png" alt="Chat Support" className="w-16 h-16 group-hover:scale-105 transition-transform duration-300" />
        </button>
      </div>
      
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg relative max-h-[90vh] overflow-hidden">
            {/* Close button */}
            <button 
              onClick={handleClose} 
              className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center transition-colors z-10"
            >
              &times;
            </button>
            
            {/* Success Message */}
            {showSuccess && (
              <div className="absolute inset-0 bg-white rounded-3xl flex items-center justify-center z-20">
                <div className="text-center p-8">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-blue-700 mb-2">Message Sent!</h3>
                  <p className="text-gray-600 mb-4">Your message has been sent successfully.</p>
                  <p className="text-sm text-gray-500">We'll get back to you soon.</p>
                </div>
              </div>
            )}
            
            {/* Header */}
            <div className="p-8 pb-4">
              <div className="flex items-center mb-6">
                <img src="/chatsprt.png" alt="Chat Icon" className="w-16 h-16 mr-4" />
                <div>
                  <h2 className="text-3xl font-extrabold text-blue-700 leading-tight">CHAT SUPPORT</h2>
                  <p className="text-sm text-gray-500 -mt-1">Address your queries</p>
                </div>
              </div>
            </div>
            
            {/* Scrollable Form */}
            <div className="px-8 pb-8 max-h-[calc(90vh-200px)] overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-blue-800 mb-2">ID NUMBER:</label>
                  <input 
                    type="number" 
                    name="idNumber"
                    value={formData.idNumber}
                    onChange={handleInputChange}
                    className="w-full rounded-lg bg-blue-50 px-4 py-3 outline-none border border-transparent focus:border-blue-300 focus:bg-white transition-all" 
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-blue-800 mb-2">FULL NAME:</label>
                  <input 
                    type="text" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full rounded-lg bg-blue-50 px-4 py-3 outline-none border border-transparent focus:border-blue-300 focus:bg-white transition-all" 
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-blue-800 mb-2">COURSE:</label>
                  <select 
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    className="w-full rounded-lg bg-blue-50 px-4 py-3 outline-none border border-transparent focus:border-blue-300 focus:bg-white transition-all"
                    required
                  >
                    <option value="">Select course</option>
                    <option value="BSIT">BSIT</option>
                    <option value="BSED">BSED</option>
                    <option value="BEED">BEED</option>
                    <option value="BSHM">BSHM</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-blue-800 mb-2">BIRTHDAY:</label>
                  <input 
                    type="date" 
                    name="birthday"
                    value={formData.birthday}
                    onChange={handleInputChange}
                    className="w-full rounded-lg bg-blue-50 px-4 py-3 outline-none border border-transparent focus:border-blue-300 focus:bg-white transition-all" 
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-blue-800 mb-2">EMAIL:</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full rounded-lg bg-blue-50 px-4 py-3 outline-none border border-transparent focus:border-blue-300 focus:bg-white transition-all" 
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-blue-800 mb-2">MESSAGE:</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full rounded-lg bg-blue-50 px-4 py-3 outline-none border border-transparent focus:border-blue-300 focus:bg-white transition-all resize-none" 
                    rows={3}
                    required
                  ></textarea>
                </div>
                
              
                <div className="pt-4">
                      <label className="block text-sm font-bold text-blue-800 mb-3">ID PHOTO FOR VERIFICATION:</label>
                  
                  <div className="space-y-3">
                    <label className="cursor-pointer block">
                      <div className="inline-flex items-center bg-blue-100 hover:bg-blue-200 p-3 rounded-lg transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600 mr-2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                        <span className="text-blue-600 font-medium">Choose Photo</span>
                      </div>
                      <input 
                        ref={fileInputRef}
                        type="file" 
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden" 
                      />
                    </label>
                    
                    {selectedFile && (
                      <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center text-sm text-green-700">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {selectedFile.name}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="pt-4">
                  <button 
                    type="submit" 
                    className="w-full bg-blue-600 text-white font-bold rounded-full py-3 shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-200"
                  >
                    SEND
                  </button>
                </div>
              </form>
            </div>
       </div>
        </div>
      )}
    </>
  );
}

