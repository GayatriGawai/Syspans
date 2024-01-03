import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteEmployee } from '../actions/employee';
import { useDispatch } from 'react-redux';
import { getEmployees } from '../actions/employee';
import Pagination from './auth/Pagination';

const Employee = (employee) => {
    const dispatch = useDispatch();
    const [employees, setEmployees] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage = 0, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchEmployees = async () => {
            const token = localStorage.getItem('jwtSecret');
            const limit = 10;

            if (token) {
                try {
                    const response = await fetch(
                        `http://localhost:5000/api/employees?page=${currentPage}`,
                        {
                            headers: {
                                'x-auth-token': token,
                            },
                        }
                    );

                    if (response.ok) {
                        const data = await response.json();
                        setEmployees(data);
                        // Assuming your API sends the total number of pages in the response
                        setTotalPages(data.totalPage);
                    } else {
                        console.error(
                            'Error fetching data:',
                            response.statusText
                        );
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            } else {
                console.error('Token is undefined');
            }
        };

        fetchEmployees();
    }, [currentPage]);
    const handleDelete = async (empId) => {
        try {
            await dispatch(deleteEmployee(empId));
            setEmployees((prevEmployees) =>
                prevEmployees.filter((employee) => employee._id !== empId)
            );
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };
    const onPageChange = (page) => {
        setCurrentPage(page);
    };
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
                            to={'/employees/add'}
                            type="button"
                            className="bg-green-500 float-right mb-2 h-10 w-fit text-center rounded p-2 text-white hover:bg-green-600 hover:scale-105 hover:opacity-100 transition duration-300 ease-in-out"
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
                                        <td>{employee._id}</td>
                                        <td>
                                            <Link
                                                to={`/employee/get/${employee._id}`}
                                                className="hover:text-red-700"
                                            >
                                                {employee.name}
                                            </Link>
                                        </td>
                                        <td>{employee.designation}</td>
                                        <td>{employee.status}</td>
                                        <td>
                                            <Link
                                                to={`/employee/edit/${employee._id}`}
                                                className="text-blue-500"
                                            >
                                                <i className="fas fa-pencil"></i>
                                            </Link>

                                            <button
                                                onClick={() =>
                                                    handleDelete(employee._id)
                                                }
                                                className="text-red-500 ml-2"
                                            >
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Pagination
                currentPage={currentPage}
                totalPage={totalPage}
                onPageChange={onPageChange}
            />
        </div>
    );
};

export default Employee;
