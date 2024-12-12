import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import reoprt from '../assets/images/report.gif';

function SignInForm() {
    const navigate = useNavigate();
    
    const [isSignUp, setIsSignUp] = useState(false); // Toggle between SignUp and SignIn
    const [paserror, setpaserror] = useState(''); // Password error message
    const [success, setsuccess] = useState(''); // Success message
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Toggle between sign-up and login
    const toggleSignUp = () => {
        setIsSignUp(!isSignUp);
        setsuccess('');
        setpaserror('');
    };

    // Handle form submission (for both SignUp and Login)
    const handleFormSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
       
       
        const payloads = {
            email: formData.email,
            password: formData.password
        };
        console.log(payloads);
        try {
            const response = await fetch('https://eithi-aibackend.vercel.app/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payloads),
            });
            const data = await response.json();
            console.log(data);
            if (data.status === '1') {
                setsuccess('Login successful!');
                var d = data.result[0];
                localStorage.setItem('adminData', JSON.stringify(d));
                setTimeout(() => {
                    navigate('/admin/dashboard');
                }, 2000);
                setpaserror('');
            } else {
                setpaserror(data.message || 'Login failed');
                setsuccess('');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setpaserror('An error occurred. Please try again.');
        }
    };

    // Password validation function
    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!regex.test(password)) {
            return {
                valid: false,
                message: "Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.",
            };
        }
        return { valid: true, message: "Password is strong!" };
    };

    return (
        <div className="bg-[#dae9fd] ">
            <div className="flex justify-center h-screen">
                <div className="hidden bg-cover lg:block lg:w-2/4">
                    <div className="flex items-center h-full mr-[200px]">
                        <img src={reoprt} alt="" className="w-[99%]" />
                    </div>
                </div>
                <div className="flex items-center w-full max-w-md px-10 my-10 border border-[#14035F] bg-gray-50">
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold">
                            {isSignUp ? 'Create New Account' : 'Log In'}
                        </h1>
                        <div className="mt-8">
                            <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
                            <div>
                                    <label htmlFor="email" className="block mb-2 text-sm text-gray-500 font-semibold">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="example@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-[#14035F] focus:border-purple-200 focus:ring-purple-200 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                </div>
                                <div>
                                    
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Your Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className='form-control'
                                    />
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-[#14035F] hover:bg-gray-400 focus:outline-none focus:bg-gray-400 focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                                    >
                                        Login
                                    </button>
                                </div>
                            </form>
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignInForm;