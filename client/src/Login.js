import React from 'react';
function validateLogin() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if (email === 'admin@gmail.com' && password === 'admin') {
        alert('Logged in as admin!');
        window.location.href = 'admin_dashboard.html';
    } else if (email === 'emp@gmail.com' && password === '12345678') {
        alert('Logged in as employee');
        window.location.href = 'emp_dashboard.html';
    } else {
        alert('Invalid username or password. Please try again.');
    }

    return false;
}

const Login = () => {
    return (
        <div class="container mx-auto mt-16">
            <section class="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
                <h2 class="text-2xl font-semibold mb-4 font-bold">Sign In</h2>
                <form onsubmit={validateLogin}>
                    <div class="mb-4">
                        <label
                            for="email"
                            class="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            class="w-full px-3 py-2 border rounded-md"
                            placeholder="Enter your Email"
                            required
                        />
                    </div>

                    <div class="mb-4">
                        <label
                            for="password"
                            class="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            class="w-full px-3 py-2 border rounded-md"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        class="bg-yellow-600 hover:bg-yellow-500 font-bold py-2 px-4 rounded"
                    >
                        Login
                    </button>
                </form>
            </section>
        </div>
    );
};

export default Login;
