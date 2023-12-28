import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteEmployee } from '../../actions/employee';

const DeleteEmployee = ({ match, history }) => {
    const dispatch = useDispatch();
    const empId = match.params.id;
    const [employees, setEmployees] = useState([]);
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch(
                    'http://localhost:5000/api/employees'
                );
                const data = await response.json();
                setEmployees(data);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };
        fetchEmployees();
    }, [dispatch, empId]);

    console.log('Hi there it is deleteEmployee');
    const handleDelete = async () => {
        try {
            await dispatch(deleteEmployee(empId));
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    return (
        <div>
            <h2>Delete Employee</h2>
            <p>Are you sure you want to delete this employee?</p>
            <button onClick={handleDelete}>Delete</button>
            <Link to={`/employees/${empId}`}>Cancel</Link>
        </div>
    );
};

export default DeleteEmployee;
