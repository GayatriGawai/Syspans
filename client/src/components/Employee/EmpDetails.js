import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const EmpDetails = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        // Fetch employee details by ID
        fetch(`http://localhost:5000/api/employees/${id}`)
            .then((response) => response.json())
            .then((data) => setEmployee(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, [id]);

    if (!employee) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>Employee Details</h2>
            <p>ID: {employee.empId}</p>
            <p>Name: {employee.name}</p>
            <p>Designation: {employee.designation}</p>
            <p>Status: {employee.status}</p>

            <Link to="/employees">Back to Employee List</Link>
        </div>
    );
};

export default EmpDetails;
