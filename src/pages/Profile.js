import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Camera } from 'lucide-react';
import React, { useState, useRef } from 'react';

const Profile = () => {
    const [image, setImage] = useState(null);
    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex h-screen bg-gray-900 text-white">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 p-12">
                    <h1 className="text-2xl font-semibold mt-12 lg:mt-0 text-primary mb-6">Profile</h1>
                    <div className="bg-gray-800 border border-primary shadow-[5px_5px_0px_0px_rgba(20,3,95,1)] p-6 rounded-lg">
                        <div className="flex flex-col items-center mb-6">
                            <div className="w-24 h-24 bg-gray-600 rounded-full flex items-center justify-center mb-2">
                                {image ? (
                                    <img src={image} alt="Selected" className="w-full h-full object-cover rounded-full" />
                                ) : (
                                    <Camera className="text-gray-400 w-8 h-8" />
                                )}
                            </div>
                            <button
                                className="text-blue-500"
                                onClick={handleButtonClick}
                            >
                                Upload Photo
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-primary mb-1">First Name</label>
                                <input type="text" placeholder="Enter your first name" className="w-full p-2 border border-primary bg-gray-700 text-white rounded" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-primary mb-1">Last Name</label>
                                <input type="text" placeholder="Enter your last name" className="w-full p-2 border border-primary bg-gray-700 text-white rounded" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-primary mb-1">Your email</label>
                                <input type="email" placeholder="Enter your email" className="w-full p-2 border border-primary bg-gray-700 text-white rounded" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-primary mb-1">Phone Number</label>
                                <input type="tel" placeholder="Enter your phone number" className="w-full p-2 border border-primary bg-gray-700 text-white rounded" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-primary mb-1">Date of Birth</label>
                                <input type="text" placeholder="Enter your birthdate" className="w-full p-2 border border-primary bg-gray-700 text-white rounded" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-primary mb-1">Gender</label>
                                <select className="w-full p-2 border border-primary bg-gray-700 text-white rounded">
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Other</option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-6 flex justify-center ">
                            <button className="bg-primary text-white py-2 px-4 hover:bg-indigo-600 transition duration-300 rounded-md">
                                Add Now
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Profile;
