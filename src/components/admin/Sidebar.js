import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart2, List, BarChart, MessageSquare, DollarSign, Settings, LogOut, Menu } from 'lucide-react';
import logo from '../../assets/images/logo.png';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            const isMobileScreen = window.innerWidth < 768;
            setIsMobile(isMobileScreen);
            if (isMobileScreen) {
                setIsOpen(false); // Close sidebar by default on mobile
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {isMobile && !isOpen && (
                <button
                    onClick={toggleSidebar}
                    className="fixed top-4 left-4 z-50 p-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-md shadow-md hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500 transition duration-300"
                >
                    <Menu size={24} />
                </button>
            )}
            <div className={`relative ${isMobile ? 'w-0' : isOpen ? 'w-64' : 'w-16'} transition-all duration-300 ease-in-out z-[100]`}>
                <div
                    className={`fixed top-0 left-0 h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-gray-900 text-white border-r border-gray-700 flex flex-col transition-all duration-300 ease-in-out
          ${isMobile ? (isOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full') : isOpen ? 'w-64' : 'w-16'}`}
                >
                    <div className="p-2 border-b border-gray-700 flex justify-between items-center">
                        {isOpen && <img src={logo} alt="Logo" className="w-32 h-auto" />}
                        <button onClick={toggleSidebar} className="p-2 rounded-md hover:bg-gray-700 transition-all">
                            <Menu size={24} />
                        </button>
                    </div>
                    <nav className="flex-grow">
                        <ul className="space-y-4 py-4">
                            <SidebarItem icon={<BarChart2 />} text="Dashboard" href="/admin/dashboard" isOpen={isOpen} />
                            <SidebarItem icon={<List />} text="Quiz" href="/admin/quiz" isOpen={isOpen} />
                            <SidebarItem icon={<List />} text="User" href="/admin/user" isOpen={isOpen} />
                            <SidebarItem icon={<MessageSquare />} text="Support and Updates" href="#" isOpen={isOpen} />
                            <SidebarItem icon={<DollarSign />} text="Subscription" href="#" isOpen={isOpen} />
                            <SidebarItem icon={<Settings />} text="Settings" href="#" isOpen={isOpen} />
                        </ul>
                    </nav>
                    <div className="p-4 border-t border-gray-700">
                        <SidebarItem icon={<LogOut />} text="Logout" href="/logout" isOpen={isOpen} />
                    </div>
                </div>
            </div>
        </>
    );
};

const SidebarItem = ({ icon, text, href, isOpen }) => {
    const location = useLocation();
    const isActive = location.pathname === href;

    return (
        <li className="list-none">
            <Link
                to={href}
                className={`flex items-center space-x-3 px-4 py-2 text-sm hover:bg-primary transition-all duration-300 ease-in-out
                ${isActive ? 'bg-primary text-white' : 'bg-gray-800 text-gray-400'}`}
            >
                {React.cloneElement(icon, { className: `w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}` })}
                {isOpen && <span className={`${isActive ? 'text-white' : 'text-gray-400'}`}>{text}</span>}
            </Link>
        </li>
    );
};

export default Sidebar;
