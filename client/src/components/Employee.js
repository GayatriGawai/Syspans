import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Employee = () => {
    console.log('Employee component rendered');
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        // Retrieved the token from localStorage
        const token = localStorage.getItem('jwtToken');

        // Checked if the token is available
        if (token) {
            console.log('Token:', token);

            // Made the fetch request with the token
            fetch('http://localhost:5000/api/employees', {
                headers: {
                    'x-auth-token': token,
                },
            })
                .then((response) => {
                    console.log('response status', response.status);
                    return response.json();
                })
                .then((data) => {
                    console.log('Fetched Data:', data);
                    setEmployees(data);
                })
                .catch((error) => console.error('Error fetching data:', error));
        } else {
            console.error('Token is undefined');
        }
    }, []);

    return (
        <div>
            <div>
                <header className="bg-yellow-600 w-fit h-16 py-2">
                    <p className="text-center font-semibold text-4xl px-5">
                        <i className="fas fa-users"></i> Employees
                    </p>
                </header>
            </div>
            <div className="container mx-auto p-4">
                <h2 className="text-xl font-semibold  mt-5 text-2xl">
                    <i className="fas fa-list"> </i> Employee List
                </h2>
                <div className="container">
                    <div className="contents">
                        <Link
                            to={'/employees'}
                            type="button"
                            className="bg-green-500 float-right mb-2 h-10 w-10 text-center rounded p-2 text-white hover:bg-green-600 hover:scale-105 hover:opacity-100 transition duration-300 ease-in-out"
                        >
                            <i className="fas fa-add"> </i>
                        </Link>
                    </div>
                    <div>
                        <table className="w-full border border-collapse border-gray-300 border-r">
                            <thead className="bg-yellow-500 h-10">
                                <tr>
                                    <th style={{ width: '20%' }}>ID</th>
                                    <th style={{ width: '20%' }}>Name</th>
                                    <th style={{ width: '20%' }}>
                                        Designation
                                    </th>
                                    <th style={{ width: '20%' }}>Status</th>
                                    <th style={{ width: '20%' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-center text-sm font-medium">
                                {employees.map((employee) => (
                                    <tr key={employee._id} className="h-10">
                                        <td>{employee.empId}</td>
                                        <td>
                                            <Link
                                                to="/demo2.html"
                                                className="hover:text-red-700"
                                            >
                                                {employee.name}
                                            </Link>
                                        </td>
                                        <td>{employee.designation}</td>
                                        <td>{employee.status}</td>
                                        <td>
                                            <a
                                                href="#"
                                                className="text-blue-500"
                                            >
                                                <i className="fas fa-pencil"></i>
                                            </a>

                                            <a
                                                href="#"
                                                className="text-red-500 ml-2"
                                            >
                                                <i className="fas fa-trash"></i>
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Employee;
