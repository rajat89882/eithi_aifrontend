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
        if (isSignUp) {
            // Validate passwords match if it's a sign-up action
            if (isSignUp && formData.password !== formData.confirmPassword) {
                setpaserror('Passwords do not match!');
                return;
            }

            const { valid, message } = validatePassword(formData.password);
            if (!valid) {
                setpaserror(message); // Display the validation message
                return;
            }
        }
        if (isSignUp) {
            if (isSignUp && formData.password !== formData.confirmPassword) {
                setpaserror('Passwords do not match!');
                return;
            }
        }
        if (isSignUp) {
            const payload = {
                email: formData.email,
                password: formData.password,
                name:formData.name,
            };
        }
       
        if (isSignUp) {
            // Sign up logic
            try {
                const response = await fetch('https://eithi-aibackend.vercel.app/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        password: formData.password,
                    }),
                });
                const data = await response.json();
                if (data.status === '1') {
                    var d = data.result;
                    console.log(d);
                    setsuccess('Registration successful!');
                    localStorage.setItem('userData', JSON.stringify(d));
                    setTimeout(() => {
                        navigate('/onboarding');
                    }, 4000);
                    setpaserror('');
                } else {
                    setpaserror(data.error || 'Registration failed');
                    setsuccess('');
                }
            } catch (error) {
                console.error('Error during registration:', error);
                setpaserror('An error occurred. Please try again.');
            }
        } else {
            // Login logic
            const payloads = {
                email: formData.email,
                password: formData.password
            };
            console.log(payloads);
            try {
                const response = await fetch('https://eithi-aibackend.vercel.app/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payloads),
                });
                const data = await response.json();
                
                if (data.status === '1') {
                    setsuccess('Login successful!');
                    var d = data.result[0];
                    localStorage.setItem('userData', JSON.stringify(d));
                    setTimeout(() => {
                        navigate('/onboarding');
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
                                {isSignUp && (
                                    <div>
                                        <label htmlFor="name" className="block mb-2 text-sm text-gray-500 font-semibold">First Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            placeholder="Your Name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-[#14035F] focus:border-purple-200 focus:ring-purple-200 focus:outline-none focus:ring focus:ring-opacity-40"
                                        />
                                    </div>
                                )}
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
                                    <div className="flex justify-between mb-2">
                                        <label htmlFor="password" className="text-sm text-gray-500 font-semibold">Password</label>
                                        {!isSignUp && (
                                            <a href="#" className="text-sm text-gray-400 focus:text-gray-500 hover:text-gray-500 font-semibold hover:underline">Forgot password?</a>
                                        )}
                                    </div>
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
                                {isSignUp && (
                                    <div>
                                        <label htmlFor="confirmPassword" className="block mb-2 text-sm text-gray-500 font-semibold">Confirm Password</label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            id="confirmPassword"
                                            placeholder="Confirm Your Password"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-[#14035F] focus:border-purple-200 focus:ring-purple-200 focus:outline-none focus:ring focus:ring-opacity-40"
                                        />
                                        
                                    </div>
                                )}
                                <span className="text-danger">{paserror}</span>
                                <span className="text-success">{success}</span>
                                <div>
                                    <button
                                        type="submit"
                                        className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-[#14035F] hover:bg-gray-400 focus:outline-none focus:bg-gray-400 focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                                    >
                                        {isSignUp ? 'Submit' : 'Sign in'}
                                    </button>
                                </div>
                            </form>
                            <p className="mt-6 text-sm text-center text-gray-400">
                                {isSignUp ? 'Already have an account?' : "Don't have an account yet?"}
                                <button className="text-purple-800 font-semibold focus:outline-none focus:underline hover:underline ml-1" onClick={toggleSignUp}>
                                    {isSignUp ? 'Sign in' : 'Sign up'}
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignInForm;
