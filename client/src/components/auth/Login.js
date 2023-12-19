import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const validateLogin = (e) => {
        e.preventDefault();

        var email = e.target.email.value;
        var password = e.target.password.value;

        if (email === 'admin@insnapsys.com' && password === 'admin') {
            alert('Logged in as admin!');
            navigate('/admin_dashboard');
        } else if (email === 'emp@gmail.com' && password === '12345678') {
            alert('Logged in as employee');
            navigate('/emp_dashboard');
        } else {
            alert('Invalid username or password. Please try again.');
        }

        return false;
    };
    return (
        <div className="container mx-auto mt-16">
            <section className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
                <h2 className="text-2xl font-semibold mb-4 font-bold">
                    Sign In
                </h2>
                <form onSubmit={validateLogin}>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-3 py-2 border rounded-md"
                            placeholder="Enter your Email"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full px-3 py-2 border rounded-md"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-yellow-600 hover:bg-yellow-500 font-bold py-2 px-4 rounded"
                    >
                        Login
                    </button>
                </form>
            </section>
        </div>
    );
};

export default Login;
