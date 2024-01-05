import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Admin_dashboard = () => {
    const [headers, setHeaders] = useState({});
    useEffect(() => {
        // Retrieve the JWT token from local storage
        const token = localStorage.getItem('jwtSecret');

        // Include token in headers for protected requests
        const authHeaders = {
            'Content-Type': 'application/json',
            'x-auth-token': token,
        };
        setHeaders(authHeaders);
    }, []);
    return (
        <div>
            <div>
                <nav className="bg-yellow-600 w-full h-16 py-2 fixed top-0">
                    <p className="text-center font-semibold text-4xl">
                        <i className="fas fa-user"></i> Admin Dashboard
                    </p>
                </nav>
            </div>
            <div className="m-6 text-4x px-5 w-fit flex justify-inline space-x-px">
                <div>
                    <Link className="employee-button px-5" to={'/employees'}>
                        <i className="fas fa-users fa-6x mt-16 text-center text-yellow-700 hover:text-yellow-600">
                            <p className="font-semibold text-sm mt-2 font-sans">
                                Employee
                            </p>
                        </i>
                    </Link>
                </div>
                <div>
                    <Link className="attendance-button px-5" to={'/attendance'}>
                        <i className="far fa-calendar-check fa-6x mt-16 text-center text-yellow-700 hover:text-yellow-600">
                            <p className="font-semibold text-sm mt-2 font-sans">
                                Attendance
                            </p>
                        </i>
                    </Link>
                </div>
                <div>
                    <Link className="leave-button px-5" to={'/leave'}>
                        <i className="fas fa-sign-out-alt fa-6x mt-16 text-center text-yellow-700 hover:text-yellow-600">
                            <p className="font-semibold text-sm mt-2 font-sans">
                                Leave
                            </p>
                        </i>
                    </Link>
                </div>
                <div>
                    <Link className="timesheet-button px-5" to={'/timesheet'}>
                        <i className="far fa-clock fa-6x mt-16 text-center text-yellow-700 hover:text-yellow-600">
                            <p className="font-semibold text-sm mt-2 font-sans">
                                Timesheet
                            </p>
                        </i>
                    </Link>
                </div>
                <div>
                    <Link
                        className="notifications-button px-5"
                        to={'/announcement'}
                    >
                        <i className="far fa-newspaper fa-6x mt-16 text-center text-yellow-700 hover:text-yellow-600">
                            <p className="font-semibold text-sm mt-2 font-sans">
                                Announcement
                            </p>
                        </i>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Admin_dashboard;
