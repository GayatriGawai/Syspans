import React from 'react';

const Admin_dashboard = () => {
    return (
        <div>
            <header className="bg-yellow-600 w-fit h-16 py-2">
                <p className="text-center font-semibold text-4xl px-5">
                    <i className="fas fa-user"></i> Admin Dashboard
                </p>
            </header>
            <div className="m-6 text-4x px-5 w-fit flex justify-inline space-x-px">
                <div>
                    <a
                        className="employee-button px-5"
                        href="/employee_management/Emp_mngmt.html"
                    >
                        <i className="fas fa-users fa-6x mt-16 text-center text-yellow-700 hover:text-yellow-600">
                            <p className="font-semibold text-sm mt-2 font-sans">
                                Employee
                            </p>
                        </i>
                    </a>
                </div>
                <div>
                    <a
                        className="attendance-button px-5"
                        href="/Attendance/attendance.html"
                    >
                        <i className="far fa-calendar-check fa-6x mt-16 text-center text-yellow-700 hover:text-yellow-600">
                            <p className="font-semibold text-sm mt-2 font-sans">
                                Attendance
                            </p>
                        </i>
                    </a>
                </div>
                <div>
                    <a
                        className="leave-button px-5"
                        href="/LeaveManagement/Leave_Mngmt.html"
                    >
                        <i className="fas fa-sign-out-alt fa-6x mt-16 text-center text-yellow-700 hover:text-yellow-600">
                            <p className="font-semibold text-sm mt-2 font-sans">
                                Leave
                            </p>
                        </i>
                    </a>
                </div>
                <div>
                    <a
                        className="notifications-button px-5"
                        href="/Timesheet/timesheet.html"
                    >
                        <i className="far fa-clock fa-6x mt-16 text-center text-yellow-700 hover:text-yellow-600">
                            <p className="font-semibold text-sm mt-2 font-sans">
                                Timesheet
                            </p>
                        </i>
                    </a>
                </div>
                <div>
                    <a
                        className="notifications-button px-5"
                        href="Announcement/announcement.html"
                    >
                        <i className="far fa-newspaper fa-6x mt-16 text-center text-yellow-700 hover:text-yellow-600">
                            <p className="font-semibold text-sm mt-2 font-sans">
                                Announcement
                            </p>
                        </i>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Admin_dashboard;
