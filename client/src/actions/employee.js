import axios from 'axios';
import { setAlert } from './alert';
import { login } from './auth';
// employee.js

import {
    GET_EMPLOYEE_REQUEST,
    GET_EMPLOYEE_SUCCESS,
    GET_EMPLOYEE_FAILURE,
    EMPLOYEE_ERROR,
    GET_EMPLOYEES,
    UPDATE_EMPLOYEE,
    DELETE_EMPLOYEE,
    CREATE_SUCCESS,
    CREATE_ERROR,
} from './types';
// Get all employees
export const getEmployees = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/employee');
        dispatch({
            type: GET_EMPLOYEES,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: EMPLOYEE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

// GET PROFILE by ID

export const getEmployeeById = (empId) => async (dispatch) => {
    try {
        console.log(empId);
        const token = localStorage.getItem('jwtSecret');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
        };
        const res = await axios.get(`/api/employees/get/${empId}`, config);
        console.log('Response from server:', res);
        const employeeData = res.data;
        dispatch({
            type: GET_EMPLOYEE_SUCCESS,
            payload: employeeData,
        });
    } catch (err) {
        console.error('Error in getEmployeeById:', err);
        const errorMessage = err.response
            ? err.response.data.msg
            : 'Server error';
        dispatch({
            type: GET_EMPLOYEE_FAILURE,
            payload: errorMessage,
        });
    }
};

// Create Employee Profile
export const createEmployee = (formData, navigate) => async (dispatch) => {
    try {
        const token = localStorage.getItem('jwtSecret');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
        };
        console.log(formData);

        const res = await axios.post(
            'http://localhost:5000/api/employees/add',
            formData,
            config
        );

        dispatch({
            type: CREATE_SUCCESS,
            payload: res.data,
        });

        dispatch(setAlert('Employee Profile Created', 'success'));

        navigate('/employees'); // Redirect to the dashboard or the desired route
    } catch (err) {
        const errors = err.response?.data?.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: CREATE_ERROR,
            payload: {
                msg: err.response?.statusText,
                status: err.response?.status,
            },
        });
    }
};

// Update Employee Profile by ID
export const updateEmployeeProfile = (empId, formData) => async (dispatch) => {
    try {
        const token = localStorage.getItem('jwtSecret');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
        };

        const res = await axios.put(
            `/api/employees/${empId}`,
            formData,
            config
        );

        dispatch({
            type: UPDATE_EMPLOYEE,
            payload: res.data,
        });

        dispatch(setAlert('Employee Profile Updated', 'success'));
    } catch (err) {
        const errors = err.response?.data?.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: EMPLOYEE_ERROR,
            payload: {
                msg: err.response?.statusText,
                status: err.response?.status,
            },
        });
    }
};

// Delete Employee by ID
export const deleteEmployee = (empId) => async (dispatch) => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
        try {
            const token = localStorage.getItem('jwtSecret');
            const config = {
                headers: {
                    'x-auth-token': token,
                },
            };

            await axios.delete(
                `http://localhost:5000/api/employees/${empId}`,
                config
            );

            dispatch({
                type: DELETE_EMPLOYEE,
                payload: empId,
            });
        } catch (error) {
            console.error('Error deleting employee:', error);

            dispatch({
                type: EMPLOYEE_ERROR,
                payload: {
                    msg: 'Error deleting employee',
                    status: error.response.status,
                },
            });
        }
    }
};
