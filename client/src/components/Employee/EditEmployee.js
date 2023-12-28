import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const EditEmployee = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        // Fetch employee details by ID
        fetch(`http://localhost:5000/api/employees/${id}`)
            .then((response) => response.json())
            .then((data) => setEmployee(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, [id]);

    const handleUpdate = () => {
        // Implement the logic to update employee details
        console.log('Updating employee:', employee);
    };

    if (!employee) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>Edit Employee</h2>
            <form>
                {/* Add form fields for editing employee details */}
                <label>Name:</label>
                <input type="text" value={employee.name} />
                {/* Add more fields as needed */}
                <button type="button" onClick={handleUpdate}>
                    Update Employee
                </button>
            </form>
            <Link to={`/employee/${id}`}>View Employee Details</Link>
            <Link to="/employees">Back to Employee List</Link>
        </div>
    );
};

export default EditEmployee;
