import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteEmployee } from '../../actions/employee';

const DeleteEmployee = ({ match, history }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const token = localStorage.getItem('jwtSecret');
        dispatch(token);
    }, [dispatch]);
    const empId = match.params.id;
    console.log('Hi there it is deleteEmployee');
    const handleDelete = async () => {
        try {
            await dispatch(deleteEmployee(empId));
            // history.push('/employees');
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
