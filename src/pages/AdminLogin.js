import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import reoprt from '../assets/images/report.gif';

function SignInForm() {
    const navigate = useNavigate();

    const [isSignUp, setIsSignUp] = useState(false); // Toggle between SignUp and SignIn
    const [paserror, setPasError] = useState(''); // Password error message
    const [success, setSuccess] = useState(''); // Success message
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
        setSuccess('');
        setPasError('');
    };

    // Handle form submission (for both SignUp and Login)
    const handleFormSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        const { email, password, confirmPassword } = formData;

        // Handle Signup
        if (isSignUp) {
            if (password !== confirmPassword) {
                setPasError('Passwords do not match');
                return;
            }
            const passwordValidation = validatePassword(password);
            if (!passwordValidation.valid) {
                setPasError(passwordValidation.message);
                return;
            }
            try {
                const response = await fetch('https://eithi-aibackend.vercel.app/admin/signup', { // Use actual signup endpoint
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });
                const data = await response.json();
                if (data.status === '1') {
                    setSuccess('Account created successfully!');
                    setTimeout(() => {
                        navigate('/login');
                    }, 2000);
                } else {
                    setPasError(data.message || 'Signup failed');
                }
            } catch (error) {
                console.error('Error during signup:', error);
                setPasError('An error occurred. Please try again.');
            }
        } else {
            // Handle Login
            const payload = { email, password };
            try {
                const response = await fetch('https://eithi-aibackend.vercel.app/admin/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });
                const data = await response.json();
                if (data.status === '1') {
                    setSuccess('Login successful!');
                    localStorage.setItem('adminData', JSON.stringify(data.result[0]));
                    setTimeout(() => {
                        navigate('/admin/dashboard');
                    }, 2000);
                } else {
                    setPasError(data.message || 'Login failed');
                }
            } catch (error) {
                console.error('Error during login:', error);
                setPasError('An error occurred. Please try again.');
            }
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
        <div className="bg-[#dae9fd]">
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
                                {/* Name Field (for SignUp) */}
                                {isSignUp && (
                                    <div>
                                        <label htmlFor="name" className="block mb-2 text-sm text-gray-500 font-semibold">Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-[#14035F] focus:border-purple-200 focus:ring-purple-200 focus:outline-none focus:ring focus:ring-opacity-40"
                                        />
                                    </div>
                                )}

                                {/* Email Field */}
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

                                {/* Password Field */}
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm text-gray-500 font-semibold">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Your Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-[#14035F] focus:border-purple-200 focus:ring-purple-200 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                </div>

                                {/* Confirm Password Field (for SignUp) */}
                                {isSignUp && (
                                    <div>
                                        <label htmlFor="confirmPassword" className="block mb-2 text-sm text-gray-500 font-semibold">Confirm Password</label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            id="confirmPassword"
                                            placeholder="Confirm Password"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-[#14035F] focus:border-purple-200 focus:ring-purple-200 focus:outline-none focus:ring focus:ring-opacity-40"
                                        />
                                    </div>
                                )}

                                {/* Error and Success Messages */}
                                <div className="text-red-500">{paserror}</div>
                                <div className="text-green-500">{success}</div>

                                {/* Submit Button */}
                                <div>
                                    <button
                                        type="submit"
                                        className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-[#14035F] hover:bg-gray-400 focus:outline-none focus:bg-gray-400 focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                                    >
                                        {isSignUp ? 'Sign Up' : 'Login'}
                                    </button>
                                </div>
                            </form>

                            {/* Toggle between Sign Up and Login */}
                            <div className="mt-4 text-sm text-center">
                                <p>
                                    {isSignUp ? "Already have an account?" : "Don't have an account?"}{' '}
                                    <button
                                        onClick={toggleSignUp}
                                        className="text-[#14035F] hover:underline"
                                    >
                                        {isSignUp ? 'Log In' : 'Sign Up'}
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignInForm;
