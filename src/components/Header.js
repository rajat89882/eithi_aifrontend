import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import Avatar from '../assets/images/avatar.png';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        // Clear admin data from localStorage
        localStorage.removeItem('userData');

        // Redirect to login page
        navigate('/login');
    };

    return (
        <header className="hidden md:block bg-gray-900 shadow-sm z-10">
            <div className="max-w-7xl mx-auto py-4 px-2 sm:px-4 lg:px-6 flex justify-between items-center">
                {/* Search Input */}
                <div className="relative mr-4">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-[400px] pl-10 pr-4 py-2 border border-gray-700 bg-gray-800 rounded-lg text-gray-300 focus:outline-none focus:border-blue-500"
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-500" size={20} />
                </div>

                {/* User Info and Dropdown */}
                <div className="flex items-center relative">
                    <img
                        className="h-8 w-8 rounded-full"
                        src={Avatar}
                        alt="User avatar"
                    />
                    <div className="flex flex-col ml-2">
                        <span className="text-sm font-medium text-gray-300">Test</span>
                        <span className="text-xs text-gray-500">User</span>
                    </div>

                    {/* Dropdown Toggle Icon */}
                    <button onClick={toggleDropdown} className="ml-2">
                        <ChevronDown className="text-gray-500" />
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-12 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-20">
                            <ul className="py-2">
                                <li className="px-4 py-2 hover:bg-gray-700 text-gray-300 cursor-pointer">
                                    Profile
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-700 text-gray-300 cursor-pointer">
                                    Settings
                                </li>
                                <li
                                    className="px-4 py-2 hover:bg-gray-700 text-gray-300 cursor-pointer"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
